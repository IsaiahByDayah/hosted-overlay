import { Meta, Story } from "@storybook/react"

import ProgressBar, { ProgressBarProps } from "components/ProgressBar"

export default {
  title: "Components/ProgressBar",
  component: ProgressBar,
  parameters: {
    layout: "centered",
  },
} as Meta

export const Basic: Story<ProgressBarProps> = (args) => (
  <ProgressBar {...args} />
)
Basic.args = {
  percent: 0.5,
}
Basic.argTypes = {
  percent: {
    control: {
      type: "range",
      min: 0,
      max: 1,
      step: 0.1,
    },
  },
}
