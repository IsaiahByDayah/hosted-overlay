import faker from "faker"
import { httpsCallable } from "firebase/functions"

import firebase from "lib/firebase"
import { Message, TTSLanguage, AspectRatio } from "lib/types"

// Creates a slug formatted string from supplied string
export const slugify = (str: string): string => {
  return str
    .replace(/(_|-{2,}|\s+)/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .replace(/^(-*)/, "")
    .replace(/-{2,}/g, "-")
    .replace(/(-*)$/, "")
    .toLowerCase()
    .trim()
}

export const asString = (val: unknown): string | undefined =>
  typeof val !== "string" ? undefined : val

export const asNumber = (val: unknown): number | undefined => {
  if (typeof val === "number") return
  const valString = asString(val)
  if (!valString) return undefined
  const valParsed = parseInt(valString)
  if (isNaN(valParsed)) return undefined
  return valParsed
}

export const clamp = (min: number, value: number, max: number) =>
  Math.max(min, Math.min(value, max))

export const copyToClipboard = async (value: string) =>
  navigator.clipboard.writeText(value)

export const calculateAspectRatio = (
  aspectRatio: AspectRatio | undefined,
  defaultAspectRatio: number = 16 / 9
): number => {
  if (aspectRatio === undefined) return defaultAspectRatio

  let _aspectRatio =
    typeof aspectRatio === "function" ? aspectRatio() : aspectRatio

  let __aspectRatio = defaultAspectRatio
  if (typeof _aspectRatio === "string") {
    const [w, h] = _aspectRatio.split(":")
    const width = asNumber(w)
    const height = asNumber(h)
    if (width && height) {
      __aspectRatio = width / height
    }
  }

  return __aspectRatio
}

export const calculateAspectRatioVerticalPadding = (
  aspectRatio: AspectRatio | undefined,
  defaultAspectRatio: number = 16 / 9
): string => {
  const _aspectRatio = calculateAspectRatio(aspectRatio, defaultAspectRatio)
  return `${(1 / _aspectRatio) * 100}%`
}

export const toArray = <T = unknown>(val: T | T[]): T[] =>
  Array.isArray(val) ? val : [val]

// REF: https://leolabs.org/blog/typesafe-firebase-cloud-functions
export const createCallable = <Params = unknown, Result = unknown>(
  name: string
): ((params: Params) => Promise<Result>) => {
  const callable = httpsCallable<Params, Result>(firebase.functions, name)
  return async (params: Params) => (await callable(params)).data
}

// REF: https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
export const str2ab = (str: string): ArrayBuffer => {
  var buf = new ArrayBuffer(str.length * 2) // 2 bytes for each char
  var bufView = new Uint16Array(buf)
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}

interface TTSMessage {
  text: string
  gender?: "MALE" | "FEMALE" | "NEUTRAL"
  language?: TTSLanguage
  onEnd?: () => void
  playImmediately?: boolean
}

export const textToSpeech = async (
  message: TTSMessage
): Promise<AudioBufferSourceNode | null> => {
  const ttsCallable = createCallable<TTSMessage, string>("tts")

  let data: string
  try {
    data = await ttsCallable(message)
  } catch (e) {
    console.log("Could not call ttsCallable")
    return null
  }

  if (!data) return null

  const audioContent = Buffer.from(data, "base64")

  const context = new window.AudioContext()

  const buffer = await context.decodeAudioData(audioContent.buffer)

  var source = context.createBufferSource()
  source.buffer = buffer
  // Connect to the final output node (the speakers)
  source.connect(context.destination)

  if (message.onEnd) source.addEventListener("ended", () => message.onEnd?.())

  // Play immediately?
  if (message.playImmediately) source.start(0)

  return source
}

interface GetFakeChatProps {
  count?: number
  seed?: number
  sentMessageEvery?: number
}
export const getFakeChat = ({
  count = 10,
  sentMessageEvery = 4,
  seed,
}: GetFakeChatProps): Message[] => {
  if (seed) faker.seed(seed)

  return Array(count)
    .fill(null)
    .map((_, index) => {
      return {
        id: `${index}`,
        username: faker.internet.userName(),
        message: faker.lorem.sentences(),
        color: faker.commerce.color(),
        sent: index % sentMessageEvery === 0,
      }
    })
}
