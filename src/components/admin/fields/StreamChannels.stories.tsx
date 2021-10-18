import { Meta, Story } from "@storybook/react"

import StreamChannels from "components/admin/fields/StreamChannels"

export default {
  title: "Admin/Fields/Stream Channels",
  component: StreamChannels,
} as Meta

export const Basic: Story = (args) => <StreamChannels {...args} />
