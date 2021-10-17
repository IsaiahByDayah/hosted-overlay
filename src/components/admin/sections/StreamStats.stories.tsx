import { Meta, Story } from "@storybook/react"

import StreamStats from "components/admin/sections/StreamStats"

export default {
  title: "Admin/Sections/Stream Stats",
  component: StreamStats,
} as Meta

export const Basic: Story = (args) => <StreamStats {...args} />
