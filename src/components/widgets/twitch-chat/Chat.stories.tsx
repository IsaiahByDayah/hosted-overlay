import { createElement } from "react"
import { Meta, Story } from "@storybook/react"

import { getFakeChat } from "lib/util"

import useTwitchChat from "hooks/useTwitchChat"

import Chat, { ChatProps } from "components/widgets/twitch-chat/Chat"

export default {
  title: "Twitch Chat/Chat",
  component: Chat,
  parameters: {
    layout: "fullscreen",
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
    const messages = getFakeChat({ count: numMessages, seed: 123 })
    return (
      <Chat
        {...args}
        messages={messages}
        sx={{
          maxHeight: "100%",
          maxWidth: "100%",
        }}
      />
    )
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

type LiveChatStoryArgs = ChatProps & { channel: string }
export const LiveChat: Story<LiveChatStoryArgs> = (args: LiveChatStoryArgs) => (
  <LiveChatStoryWrapper {...args} />
)
const LiveChatStoryWrapper = ({ channel, ...args }: LiveChatStoryArgs) => {
  const messages = useTwitchChat({ channel })
  return <Chat {...args} messages={messages} />
}
LiveChat.args = {
  channel: "isaiahbydayah",
}
LiveChat.parameters = {
  storyshots: { disable: true },
}
