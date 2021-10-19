import { Meta, Story } from "@storybook/react"

import StreamBot from "components/admin/sections/StreamBot"

export default {
  title: "Admin/Sections/Stream Bot",
  component: StreamBot,
} as Meta

export const Basic: Story = (args) => <StreamBot {...args} />
