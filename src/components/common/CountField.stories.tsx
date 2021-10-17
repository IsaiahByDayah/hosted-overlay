import { Meta, Story } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import CountField, { CountFieldProps } from "components/common/CountField"

export default {
  title: "Common/Count Field",
  component: CountField,
  parameters: {
    layout: "centered",
  },
} as Meta

const Template: Story<CountFieldProps> = (args) => <CountField {...args} />

export const Basic = Template.bind({})
Basic.args = {
  count: {
    id: "ABC123",
    value: 0,
    title: "Sample Count Title",
  },
  onDelete: action("On Delete!"),
  onSave: action("On Save!"),
}
