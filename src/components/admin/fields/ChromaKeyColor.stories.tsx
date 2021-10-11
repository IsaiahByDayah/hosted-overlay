import { Meta, Story } from "@storybook/react"

import ColorAndTheming from "components/admin/fields/ColorAndTheming"

export default {
  title: "Admin/Fields/ColorAndTheming",
  component: ColorAndTheming,
} as Meta

export const Basic: Story = (args) => <ColorAndTheming {...args} />
