import { Meta, Story } from "@storybook/react"

import OpenOverlayButton from "components/common/OpenOverlayButton"

export default {
  title: "Common/Open Overlay Button",
  component: OpenOverlayButton,
} as Meta

export const Basic: Story = (args) => <OpenOverlayButton {...args} />
