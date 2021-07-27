import { useState, useEffect } from "react"
import tmi from "tmi.js"

import { Message } from "lib/types"
import { toArray } from "lib/util"

import { useAlerts } from "components/scaffold/AlertsProvider"

interface UseChatProps {
  channel: string | string[]
}

const useChat = ({ channel }: UseChatProps): Message[] => {
  const [messages, setMessages] = useState<Message[]>([])
  const { enqueueAlert } = useAlerts()

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

    const onMessage: tmi.Events["message"] = (channel, tags, message, self) => {
      console.log(`${tags["display-name"]}: ${message}`, channel, tags, self)

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
      //   client.say(channel, `Hello to you too, @${tags["display-name"]}`)
      // }
      if (message.startsWith("!say") && `#${tags.username}` === channel) {
        const msg = message.substring(4)

        let utterance = new SpeechSynthesisUtterance(msg)
        speechSynthesis.speak(utterance)
      }

      if (message.startsWith("!alert") && `#${tags.username}` === channel) {
        const msg = message.substring(6)

        enqueueAlert({ id: msg, color: "#9013a5" })
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

    client.addListener("message", onMessage)
    client.addListener("cheer", onCheer)
    client.addListener("redeem", onRedeem)

    client.connect()

    return () => {
      client.removeListener("message", onMessage)
      client.removeListener("cheer", onCheer)
      client.removeListener("redeem", onRedeem)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return messages
}

export default useChat
