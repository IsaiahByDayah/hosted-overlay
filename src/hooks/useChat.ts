import { useState, useEffect } from "react"
import tmi from "tmi.js"

import { Message } from "lib/types"
import { toArray, textToSpeech } from "lib/util"

interface UseChatProps {
  channel: string | string[]
}

const LANGUAGE_MAPS: { [key: string]: string } = {
  en: "en-US",
  au: "en-AU",
  uk: "en-GB",
  gb: "en-GB",
  es: "es-ES",
  sp: "es-ES",
  fr: "fr-FR",
  it: "it-IT",
  jp: "ja-JP",
  ja: "ja-JP",
}

const useChat = ({ channel }: UseChatProps): Message[] => {
  const [messages, setMessages] = useState<Message[]>([])
  const [allowTTS, setAllowTTS] = useState(true)

  useEffect(() => {
    let client = new tmi.Client({
      channels: channel
        ? toArray(channel)
        : [process.env.REACT_APP_USERNAME ?? ""],
      options: {
        clientId: process.env.REACT_APP_CLIENT_ID,
        debug: true,
      },
      identity: {
        username: process.env.REACT_APP_USERNAME,
        password: process.env.REACT_APP_OAUTH_PASSWORD,
      },
    })

    const onMessage: tmi.Events["action"] = (channel, tags, message, self) => {
      console.log(`${tags["display-name"]}: ${message}`, channel, tags, self)

      message = message.trim()

      if (
        message.startsWith("!kill-tts") &&
        tags.username === process.env.REACT_APP_USERNAME
      ) {
        setAllowTTS(false)
        client.say(channel, "Killing Text-To-Speech")
        return
      }

      if (
        message.startsWith("!allow-tts") &&
        tags.username === process.env.REACT_APP_USERNAME
      ) {
        setAllowTTS(true)
        client.say(channel, "Reviving Text-To-Speech")
        return
      }

      if (message.startsWith("!echo hello")) {
        // setMessages((old) => [
        //   ...old,
        //   {
        //     id: "test",
        //     color: "#000",
        //     sent: true,
        //     username: "IsaiahByDayah",
        //     message: `Hello to you too, @${tags["display-name"]}`,
        //   },
        // ])
        client.say(channel, `Hello to you too, @${tags["display-name"]}`)
        return
      }

      if (
        message.startsWith("!tts") &&
        (tags.username === process.env.REACT_APP_USERNAME || allowTTS)
      ) {
        let text = message.substring(4).trim()
        let language: string | undefined = undefined

        console.log("TTS Text: ", text)

        if (text.startsWith("!")) {
          const lang = text.substring(1, text.indexOf(" ")).trim()
          language = LANGUAGE_MAPS[lang.toLowerCase()]

          text = text.trim()
          text = text.substring(text.indexOf(" "))
          console.log("TTS Lang: ", lang, text)
        }

        if (text) textToSpeech({ text, language })
        return
      }

      if (!tags.id || !tags["display-name"]) return

      const newMessage: Message = {
        id: tags.id,
        username: tags["display-name"],
        message: message,
        color: tags.color,
        sent: tags.mod || `#${tags.username}` === channel,
      }

      setMessages((old) => [...old, newMessage])
    }

    client.connect()

    client.addListener("message", onMessage)

    return () => {
      client.removeListener("message", onMessage)
      client.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowTTS])

  return messages
}

export default useChat
