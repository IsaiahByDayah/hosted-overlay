import { Meta, Story } from "@storybook/react"

import Header from "components/common/Header"

export default {
  title: "Common/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
} as Meta

export const Basic: Story = (args) => <Header {...args} />
