import { Meta, Story } from "@storybook/react"

import Messages from "components/admin/fields/Messages"

export default {
  title: "Admin/Fields/Messages",
  component: Messages,
} as Meta

export const Basic: Story = (args) => <Messages {...args} />
