import * as functions from "firebase-functions"
import textToSpeech from "@google-cloud/text-to-speech"
import express from "express"
// import { TextDecoder } from "util"
// import { promisify } from "util"
// import os from "os"
// import fs from "fs"
// import path from "path"

import { TTSLanguage } from "./lib/types"
import { LANGUAGE_MAPS } from "./lib/util"

import cors from "./middleware/cors"

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
