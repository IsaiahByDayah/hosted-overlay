import { useState, useEffect } from "react"
import { Events } from "tmi.js"

import { getChatClient } from "lib/twitch"
import { Message } from "lib/types"

interface UseChatProps {
  channel?: string | string[]
}

const useTwitchChat = ({ channel }: UseChatProps): Message[] => {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    // Clear messages on channel change
    setMessages([])

    if (!channel) return

    // Create chat client
    const chatClient = getChatClient(channel)

    // Handle new messages
    const onMessage: Events["message"] = (channel, tags, message, self) => {
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

    chatClient.connect()
    chatClient.addListener("message", onMessage)

    // chatClient.connect()

    return () => {
      chatClient.removeListener("message", onMessage)
      chatClient.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [allowTTS])
  }, [channel])

  return messages
}

export default useTwitchChat
