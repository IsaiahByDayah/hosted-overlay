import { Meta, Story } from "@storybook/react"

import Chat, { ChatProps } from "components/twitch-chat/Chat"

export default {
  title: "Twitch Chat/Chat",
  component: Chat,
  parameters: {
    layout: "centered",
  },
} as Meta

export const Basic: Story<ChatProps> = (args) => <Chat {...args} />
Basic.args = {}
