import { useState, useEffect } from "react"
import { Messages, ChatEvents, Commands } from "twitch-js"

import { chat } from "lib/twitch"

interface UseChatProps {
  channel: string
}

const useChat = ({ channel }: UseChatProps): Messages[] => {
  const [messages, setMessages] = useState<Messages[]>([])

  useEffect(() => {
    let onChatEvent: undefined | ((message: Messages) => void)

    onChatEvent = (message: Messages) => {
      // console.log("New Message:", message);
      if (message.command === Commands.PRIVATE_MESSAGE) {
        setMessages([...messages, message])
      }
    }

    chat.on(ChatEvents.ALL, onChatEvent)

    const func = async () => {
      await chat.connect()
      await chat.join(channel)
    }
    func()

    return () => {
      chat.off(ChatEvents.ALL, onChatEvent)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  return messages
}

export default useChat
