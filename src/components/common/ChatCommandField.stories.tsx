import { Meta, Story } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import { EchoChatCommand } from "lib/types"

import ChatCommandField, {
  ChatCommandFieldProps,
} from "components/common/ChatCommandField"

export default {
  title: "Common/Chat Command Field",
  component: ChatCommandField,
  parameters: {
    layout: "centered",
  },
} as Meta

const echoChatCommand: EchoChatCommand = {
  id: "abc123",
  type: "echo",
  command: "",
  message: "",
}

const Template: Story<ChatCommandFieldProps> = (args) => (
  <ChatCommandField {...args} chatCommand={echoChatCommand} />
)

export const All = Template.bind({})
All.args = {
  onDelete: action("On Delete!"),
  onSave: action("On Save!"),
}
