import { useState, useEffect } from "react"
import tmi from "tmi.js"

import { getChatClient } from "lib/twitch"
import { Message } from "lib/types"
// import { textToSpeech } from "lib/util"

// import { useAlerts } from "components/scaffold/AlertsProvider"

interface UseChatProps {
  channel?: string | string[]
}

const useOverlayChat = ({ channel }: UseChatProps): Message[] => {
  const [messages, setMessages] = useState<Message[]>([])
  // const { enqueueAlert } = useAlerts()
  // const [allowTTS, setAllowTTS] = useState(false)

  useEffect(() => {
    // Clear messages on channel change
    setMessages([])

    if (!channel) return

    // Create chat client
    const chatClient = getChatClient(channel)

    // Handle new messages
    const onMessage: tmi.Events["message"] = (channel, tags, message, self) => {
      console.log(
        `Overlay Chat || ${tags["display-name"]}: ${message}`,
        channel,
        tags,
        self
      )

      // Light message sanitization/formatting
      message = message.trim()

      // Don't display commands
      if (message.startsWith("!")) return

      // if (message.startsWith("!alert") && `#${tags.username}` === channel) {
      //   const msg = message.substring(6)

      //   enqueueAlert({ id: msg, color: "#9013a5" })
      //   return
      // }

      // if (
      //   message.startsWith("!kill-tts") &&
      //   tags.username === process.env.REACT_APP_USERNAME
      // ) {
      //   setAllowTTS(false)
      //   chatClient.say(channel, "Killing Text-To-Speech")
      //   return
      // }

      // if (
      //   message.startsWith("!allow-tts") &&
      //   tags.username === process.env.REACT_APP_USERNAME
      // ) {
      //   setAllowTTS(true)
      //   chatClient.say(channel, "Reviving Text-To-Speech")
      //   return
      // }

      // if (message.startsWith("!echo hello")) {
      //   // setMessages((old) => [
      //   //   ...old,
      //   //   {
      //   //     id: "test",
      //   //     color: "#000",
      //   //     sent: true,
      //   //     username: "IsaiahByDayah",
      //   //     message: `Hello to you too, @${tags["display-name"]}`,
      //   //   },
      //   // ])
      //   chatClient.say(channel, `Hello to you too, @${tags["display-name"]}`)
      //   return
      // }

      // if (message.startsWith("!accents")) {
      //   chatClient.say(
      //     channel,
      //     `The various tts accents are: ${Object.keys(LANGUAGE_MAPS)
      //       .map((key) => `!${key}`)
      //       .join(", ")}`
      //   )
      //   return
      // }

      // if (
      //   message.startsWith("!tts") &&
      //   (tags.username === process.env.REACT_APP_USERNAME || allowTTS)
      // ) {
      //   let text = message.substring(4).trim()
      //   let language: string | undefined = undefined

      //   console.log("TTS Text: ", text)

      //   if (text.startsWith("!")) {
      //     const lang = text.substring(1, text.indexOf(" ")).trim()
      //     language = LANGUAGE_MAPS[lang.toLowerCase()]

      //     text = text.trim()
      //     text = text.substring(text.indexOf(" "))
      //     console.log("TTS Lang: ", lang, text)
      //   }

      //   if (text) textToSpeech({ text, language, playImmediately: true })
      //   return
      // }

      // Don't display messages without user attached
      if (!tags.id || !tags["display-name"]) return

      // Create new displayable message
      const newMessage: Message = {
        id: tags.id,
        username: tags["display-name"],
        message: message,
        color: tags.color,
        sent: tags.mod || `#${tags.username}` === channel,
      }

      // Append new message
      setMessages((old) => [...old, newMessage])
    }

    const onCheer: tmi.Events["cheer"] = (channel, tags, message) => {
      console.log("Cheer: ", channel, tags, message)
    }
    const onRedeem: tmi.Events["redeem"] = (
      channel,
      username,
      rewardType,
      tags
    ) => {
      console.log("Redeem: ", channel, username, rewardType, tags)
    }

    chatClient.connect()
    chatClient.addListener("message", onMessage)
    chatClient.addListener("cheer", onCheer)
    chatClient.addListener("redeem", onRedeem)

    // chatClient.connect()

    return () => {
      chatClient.removeListener("message", onMessage)
      chatClient.removeListener("cheer", onCheer)
      chatClient.removeListener("redeem", onRedeem)
      chatClient.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [allowTTS])
  }, [channel])

  return messages
}

export default useOverlayChat
