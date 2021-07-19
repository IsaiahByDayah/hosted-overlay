import { Meta, Story } from "@storybook/react"

import Goal, { GoalProps } from "components/common/Goal"

export default {
  title: "Common/Goal",
  component: Goal,
  parameters: {
    layout: "centered",
  },
} as Meta

export const Basic: Story<GoalProps> = (args) => <Goal {...args} />
Basic.args = {
  value: 50,
  total: 100,
  label: "Label",
}
