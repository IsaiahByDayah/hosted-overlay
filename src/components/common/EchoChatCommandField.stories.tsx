import { Meta, Story } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import EchoChatCommandField, {
  EchoChatCommandFieldProps,
} from "components/common/EchoChatCommandField"

export default {
  title: "Common/Chat Command Field/Echo",
  component: EchoChatCommandField,
  parameters: {
    layout: "centered",
  },
} as Meta

const Template: Story<EchoChatCommandFieldProps> = (args) => (
  <EchoChatCommandField {...args} />
)

export const Basic = Template.bind({})
Basic.args = {
  chatCommand: {
    id: "abc123",
    command: "",
    type: "echo",
    message: "",
  },
  onDelete: action("On Delete!"),
  onSave: action("On Save!"),
}
