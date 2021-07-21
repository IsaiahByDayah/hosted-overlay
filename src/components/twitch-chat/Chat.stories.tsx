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

type BasicStoryArgs = ChatProps & { numMessages: number }
export const Basic: Story<BasicStoryArgs> = (args) => <BasicWrapper {...args} />
const BasicWrapper = ({ numMessages, ...args }: BasicStoryArgs) => {
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
  return <Chat {...args} />
}
LiveChat.args = {
  useData: () => useChat({ channel: "isaiahbydayah" }),
}
LiveChat.parameters = {
  storyshots: { disable: true },
}
