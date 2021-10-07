import { Meta, Story } from "@storybook/react"

import OverlaySettings from "components/admin/sections/OverlaySettings"

export default {
  title: "Admin/Sections/Overlay Settings",
  component: OverlaySettings,
} as Meta

export const Basic: Story = (args) => <OverlaySettings {...args} />
