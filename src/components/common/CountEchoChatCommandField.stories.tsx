import { Meta, Story } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import CountEchoChatCommandField, {
  CountEchoChatCommandFieldProps,
} from "components/common/CountEchoChatCommandField"

export default {
  title: "Common/Chat Command Field/Count Echo",
  component: CountEchoChatCommandField,
  parameters: {
    layout: "centered",
  },
} as Meta

const Template: Story<CountEchoChatCommandFieldProps> = (args) => (
  <CountEchoChatCommandField {...args} />
)

export const Basic = Template.bind({})
Basic.args = {
  chatCommand: {
    id: "abc123",
    command: "",
    type: "count-echo",
    countId: "",
  },
  onDelete: action("On Delete!"),
  onSave: action("On Save!"),
}
