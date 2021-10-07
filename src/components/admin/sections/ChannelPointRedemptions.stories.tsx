import { Meta, Story } from "@storybook/react"

import ChannelPointRedemptions from "components/admin/sections/ChannelPointRedemptions"

export default {
  title: "Admin/Sections/Channel Point Redemptions",
  component: ChannelPointRedemptions,
} as Meta

export const Basic: Story = (args) => <ChannelPointRedemptions {...args} />
