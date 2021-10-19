import { Meta, Story } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { Stack, Divider } from "@mui/material"

import {
  EchoChatCommand,
  CountEchoChatCommand,
  CountChangeChatCommand,
} from "lib/types"

import ChatCommandField, {
  ChatCommandFieldProps,
} from "components/common/ChatCommandField"

export default {
  title: "Common/Chat Command Field",
  component: ChatCommandField,
  parameters: {
    storyshots: { disable: true },
  },
} as Meta

const echoChatCommand: EchoChatCommand = {
  id: "a",
  type: "echo",
  command: "",
  message: "",
}

const countEchoChatCommand: CountEchoChatCommand = {
  id: "b",
  type: "count-echo",
  command: "",
  countId: "",
}

const countChangeChatCommand: CountChangeChatCommand = {
  id: "b",
  type: "count-change",
  command: "",
  countId: "",
  change: 0,
}

const Template: Story<ChatCommandFieldProps> = (args) => (
  <Stack spacing={2} divider={<Divider />}>
    <ChatCommandField {...args} chatCommand={echoChatCommand} />
    <ChatCommandField {...args} chatCommand={countEchoChatCommand} />
    <ChatCommandField {...args} chatCommand={countChangeChatCommand} />
  </Stack>
)

export const All = Template.bind({})
All.args = {
  onDelete: action("On Delete!"),
  onSave: action("On Save!"),
}
