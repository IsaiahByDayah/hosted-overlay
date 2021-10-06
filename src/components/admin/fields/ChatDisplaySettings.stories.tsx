import { Meta, Story } from "@storybook/react"

import ChatDisplaySettings from "components/admin/fields/ChatDisplaySettings"

export default {
  title: "Admin/Fields/Chat Display Settings",
  component: ChatDisplaySettings,
} as Meta

export const Basic: Story = (args) => <ChatDisplaySettings {...args} />
