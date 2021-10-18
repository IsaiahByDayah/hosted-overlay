import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
import textToSpeech from "@google-cloud/text-to-speech"
import express from "express"

import { TTSLanguage, StreamBot, TwitchIntegration } from "./lib/types"
import { LANGUAGE_MAPS } from "./lib/util"
import { validateToken } from "./lib/twitch"

import cors from "./middleware/cors"

admin.initializeApp()
const db = admin.firestore()

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true })
  response.send("Hello from Firebase!")
})

export const echo = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    express.json()(request, response, async () => {
      const res = request.query.msg

      response.send(res)
    })
  })
})

interface TTSMessage {
  text: string
  gender?: "MALE" | "FEMALE" | "NEUTRAL"
  language?: TTSLanguage
}

const DEFAULT_TTS_LANGUAGE: TTSLanguage = "american-english"
export const tts = functions.https.onCall(async (msg: TTSMessage, _context) => {
  if (!msg.text) return

  const client = new textToSpeech.TextToSpeechClient()

  const [res] = await client.synthesizeSpeech({
    input: { text: msg.text },
    voice: {
      ssmlGender: msg.gender ?? "NEUTRAL",
      languageCode: LANGUAGE_MAPS[msg.language ?? DEFAULT_TTS_LANGUAGE],
    },
    audioConfig: { audioEncoding: "MP3" },
  })

  if (!res.audioContent) return

  return Buffer.from(res.audioContent).toString("base64")
})

interface ValidateTwitchIntegrationParams {
  token?: string
}
type ValidateTwitchIntegrationReturn = NonNullable<
  TwitchIntegration["auth"]
> | null
export const validateTwitchIntegration = functions.https.onCall(
  async (
    { token }: ValidateTwitchIntegrationParams,
    { auth }
  ): Promise<ValidateTwitchIntegrationReturn> => {
    if (!auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Must be logged in to validate twitch integration."
      )
    }

    const streamBotDocRef = db.collection("streamBots").doc(auth.uid)

    if (!token) {
      const streamBotDocData = await streamBotDocRef.get()
      if (!streamBotDocData.exists) {
        throw new functions.https.HttpsError(
          "failed-precondition",
          "StreamBot data does not exist for current user."
        )
      }

      const streamBot = streamBotDocData.data() as StreamBot
      if (!streamBot.twitchIntegration?.auth) {
        throw new functions.https.HttpsError(
          "failed-precondition",
          "Twitch Integration data does not exist for current user."
        )
      }

      token = streamBot.twitchIntegration.auth.token
    }

    if (!token) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "No Twitch token provided."
      )
    }

    try {
      const tokenData = await validateToken(token)
      const auth: NonNullable<TwitchIntegration["auth"]> = {
        token,
        username: tokenData.login,
      }
      await streamBotDocRef.update({
        "twitchIntegration.auth": auth,
      })
      return auth
    } catch (e) {
      await streamBotDocRef.update({
        "twitchIntegration.auth": admin.firestore.FieldValue.delete(),
      })
      return null
    }
  }
)
