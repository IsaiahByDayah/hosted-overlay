import { Meta, Story } from "@storybook/react"

import GreenScreen, { GreenScreenProps } from "components/common/GreenScreen"

export default {
  title: "Common/GreenScreen",
  component: GreenScreen,
  parameters: {
    layout: "centered",
  },
} as Meta

export const Basic: Story<GreenScreenProps> = (args) => (
  <GreenScreen {...args} />
)
Basic.args = {
  aspectRatio: "16:9",
}
Basic.argTypes = {
  aspectRatio: {
    control: {
      type: "text",
    },
  },
}
