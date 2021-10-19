import { Meta, Story } from "@storybook/react"

import StreamBotWidget from "components/widgets/StreamBotWidget"

export default {
  title: "Widgets/Stream Bot",
  component: StreamBotWidget,
  parameters: {
    layout: "centered",
  },
} as Meta

export const Basic: Story = (args) => <StreamBotWidget {...args} />
