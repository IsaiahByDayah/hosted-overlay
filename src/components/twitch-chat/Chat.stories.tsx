import { Meta, Story } from "@storybook/react"
import faker from "faker"

import { Message } from "lib/types"

import useChat from "hooks/useChat"

import Chat, { ChatProps } from "components/twitch-chat/Chat"

export default {
  title: "Twitch Chat/Chat",
  component: Chat,
  parameters: {
    layout: "centered",
  },
} as Meta

export const Basic: Story<ChatProps & { numMessages: number }> = ({
  numMessages,
  ...args
}) => {
  faker.seed(123)

  const useData = () => {
    const fakeData = Array(numMessages)
      .fill(null)
      .map((_, index) => {
        console.log("Fake: ", index)
        return {
          id: `${index}`,
          username: faker.internet.userName(),
          message: faker.lorem.sentences(Math.ceil(Math.random() * 2)),
          color: faker.commerce.color(),
          sent: index % 4 === 0,
        } as Message
      })
    console.log("Fake Data: ", fakeData)
    return fakeData
  }

  return <Chat {...args} useData={useData} />
}
Basic.args = {
  numMessages: 0,
}
Basic.argTypes = {
  numMessages: {
    control: {
      type: "number",
    },
  },
}

export const LiveChat: Story<ChatProps> = (args) => {
  const useData = () => useChat({ channel: "isaiahbydayah" })

  return <Chat {...args} useData={useData} />
}
