import { Meta, Story } from "@storybook/react"

import OpenOverlayButton from "components/common/OpenOverlayButton"

export default {
  title: "Common/OpenOverlayButton",
  component: OpenOverlayButton,
  parameters: {
    // layout: "fullscreen",
  },
} as Meta

export const Basic: Story = (args) => <OpenOverlayButton {...args} />
