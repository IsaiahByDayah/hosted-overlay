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

export const Basic: Story<
  Omit<ChatMessageProps, "message"> & {
    username: string
    message: string
    color: string
  }
> = ({ username, message, color, ...args }) => (
  <ChatMessage
    {...args}
    message={{
      id: "123",
      username,
      message,
      color,
    }}
  />
)
Basic.args = {
  username: "Jordan_Schuppe",
  message: "Aliquip et ad sunt nostrud sint enim exercitation tempor fugiat.",
  color: "#ee8a14",
}
Basic.argTypes = {
  message: {
    control: {
      type: "text",
    },
  },
  color: {
    control: {
      type: "color",
    },
  },
}
