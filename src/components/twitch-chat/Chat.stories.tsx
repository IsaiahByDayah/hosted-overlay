import { Meta, Story } from "@storybook/react"

import useChat, { useFakeChat } from "hooks/useChat"

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
  const useData = () => useFakeChat({ count: numMessages, seed: 123 })

  return <Chat {...args} useData={useData} />
}
Basic.args = {
  numMessages: 3,
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
LiveChat.parameters = {
  storyshots: { disable: true },
}
