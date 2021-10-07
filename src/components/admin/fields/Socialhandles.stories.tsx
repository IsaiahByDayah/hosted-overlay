import { Meta, Story } from "@storybook/react"

import SocialHandles from "components/admin/fields/SocialHandles"

export default {
  title: "Admin/Fields/Social Handles",
  component: SocialHandles,
} as Meta

export const Basic: Story = (args) => <SocialHandles {...args} />
