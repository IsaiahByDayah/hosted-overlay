import { Meta, Story } from "@storybook/react"

import StreamGoals from "components/admin/fields/StreamGoals"

export default {
  title: "Admin/Fields/Stream Goals",
  component: StreamGoals,
} as Meta

export const Basic: Story = (args) => <StreamGoals {...args} />
