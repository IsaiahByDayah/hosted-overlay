import { useState, useEffect } from "react"
import { Messages, ChatEvents, Commands, PrivateMessage } from "twitch-js"
import faker from "faker"

import { chat } from "lib/twitch"
import { Message } from "lib/types"

const toMessage = (
  twitchMessage: Messages,
  channel: string
): Message | undefined => {
  switch (twitchMessage.command) {
    case Commands.PRIVATE_MESSAGE:
      twitchMessage = twitchMessage as PrivateMessage
      return {
        id: `${twitchMessage.username}-${twitchMessage.timestamp.toString()}`,
        username: twitchMessage.tags.displayName,
        message: twitchMessage.message,
        color: twitchMessage.tags.color,
        sent: twitchMessage.username === channel,
      } as Message
  }
}

interface UseChatProps {
  channel: string
}

const useChat = ({ channel }: UseChatProps): Message[] => {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    let onChatEvent: undefined | ((message: Messages) => void)

    onChatEvent = (message: Messages) => {
      // console.log("New Message:", message);
      // if (message.command === Commands.PRIVATE_MESSAGE) {
      //   setMessages([...messages, message])
      // }
      const newMessage = toMessage(message, channel)
      if (newMessage) setMessages([...messages, newMessage])
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

interface UseFakeChatProps {
  count?: number
  seed?: number
  sentMessageEvery?: number
}
export const useFakeChat = ({
  count = 10,
  sentMessageEvery = 4,
  seed,
}: UseFakeChatProps): Message[] => {
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

export default useChat
