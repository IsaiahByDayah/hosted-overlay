import { Meta, Story } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import GoalField, { GoalFieldProps } from "components/common/GoalField"

export default {
  title: "Common/Goal Field",
  component: GoalField,
  parameters: {
    layout: "centered",
  },
} as Meta

const Template: Story<GoalFieldProps> = (args) => <GoalField {...args} />

export const Basic = Template.bind({})
Basic.args = {
  goal: {
    id: "ABC123",
    countId: "XYZ789",
    target: 1,
  },
  onDelete: action("On Delete!"),
  onSave: action("On Save!"),
}
