import { Meta, Story } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import CountChangeChatCommandField, {
  CountChangeChatCommandFieldProps,
} from "components/common/CountChangeChatCommandField"

export default {
  title: "Common/Chat Command Field/Count Change",
  component: CountChangeChatCommandField,
} as Meta

const Template: Story<CountChangeChatCommandFieldProps> = (args) => (
  <CountChangeChatCommandField {...args} />
)

export const Basic = Template.bind({})
Basic.args = {
  chatCommand: {
    id: "abc123",
    command: "",
    type: "count-change",
    countId: "",
    change: 0,
  },
  onDelete: action("On Delete!"),
  onSave: action("On Save!"),
}
