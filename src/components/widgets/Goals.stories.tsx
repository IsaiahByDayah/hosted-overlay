import { Meta, Story } from "@storybook/react"

import Goals, { GoalsProps } from "components/widgets/Goals"

export default {
  title: "Widgets/Goals",
  component: Goals,
  parameters: {
    layout: "centered",
  },
} as Meta

export const Basic: Story<GoalsProps> = (args) => <Goals {...args} />
Basic.parameters = {
  // storyshots: { disable: true },
}
