import { useState, useEffect } from "react"
import tmi from "tmi.js"

import { Message } from "lib/types"
import { toArray } from "lib/util"

interface UseChatProps {
  channel: string | string[]
}

const useChat = ({ channel }: UseChatProps): Message[] => {
  const [messages, setMessages] = useState<Message[]>([])

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
      }

      if (!tags.id || !tags["display-name"] || !tags.color) return

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return messages
}

export default useChat
