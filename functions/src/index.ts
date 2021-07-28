import * as functions from "firebase-functions"
import textToSpeech from "@google-cloud/text-to-speech"

import cors from "./middleware/cors"

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true })
  response.send("Hello from Firebase!")
})

export const tts = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    const text = "Hello, world!"

    const client = new textToSpeech.TextToSpeechClient()

    const [res] = await client.synthesizeSpeech({
      input: { text: text },
      voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
      audioConfig: { audioEncoding: "MP3" },
    })

    response.send(res.audioContent)
  })
})
