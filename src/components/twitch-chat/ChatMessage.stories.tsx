import { Meta, Story } from "@storybook/react"

import ChatMessage, {
  ChatMessageProps,
} from "components/twitch-chat/ChatMessage"

export default {
  title: "Twitch Chat/Chat Message",
  component: ChatMessage,
  parameters: {
    layout: "centered",
  },
} as Meta

export const Basic: Story<ChatMessageProps> = (args) => (
  <ChatMessage {...args} />
)
Basic.args = {}
