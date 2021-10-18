import { Meta, Story } from "@storybook/react"

import ChatCommands from "components/admin/fields/ChatCommands"

export default {
  title: "Admin/Fields/Chat Commands",
  component: ChatCommands,
} as Meta

export const Basic: Story = (args) => <ChatCommands {...args} />
