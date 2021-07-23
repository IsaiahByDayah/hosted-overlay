import { Meta, Story } from "@storybook/react"

import StatusBar, { StatusBarProps } from "components/widgets/StatusBar"

export default {
  title: "Widgets/StatusBar",
  component: StatusBar,
  parameters: {
    layout: "centered",
  },
} as Meta

export const Basic: Story<StatusBarProps> = (args) => <StatusBar {...args} />
Basic.parameters = {
  // storyshots: { disable: true },
}
