import { Meta, Story } from "@storybook/react"

import OverlayData from "components/admin/sections/OverlayData"

export default {
  title: "Admin/Sections/Overlay Data",
  component: OverlayData,
} as Meta

export const Basic: Story = (args) => <OverlayData {...args} />
