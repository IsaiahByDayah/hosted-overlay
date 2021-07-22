import { createElement } from "react"
import { Meta, Story } from "@storybook/react"

import useChat from "hooks/useChat"
import useFakeChat from "hooks/useFakeChat"

import Chat, { ChatProps } from "components/widgets/twitch-chat/Chat"

export default {
  title: "Twitch Chat/Chat",
  component: Chat,
  parameters: {
    layout: "centered",
  },
} as Meta

// NOTE: using createElement to hack around using hooks in storybook stories
// REF: https://github.com/storybookjs/storybook/issues/5721#issuecomment-472769646
type BasicStoryArgs = ChatProps & { numMessages: number }
export const Basic: Story<BasicStoryArgs> = ({
  numMessages,
  ...args
}: BasicStoryArgs) =>
  createElement(() => {
    const useData = () => useFakeChat({ count: numMessages, seed: 123 })
    return <Chat {...args} useData={useData} />
  })
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
