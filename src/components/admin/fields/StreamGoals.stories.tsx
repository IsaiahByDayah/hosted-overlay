import { Meta, Story } from "@storybook/react"

import StreamCounts from "components/admin/fields/StreamCounts"

export default {
  title: "Admin/Fields/Stream Counts",
  component: StreamCounts,
} as Meta

export const Basic: Story = (args) => <StreamCounts {...args} />
