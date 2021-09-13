import { Meta, Story } from "@storybook/react"

import Overlay from "components/pages/Overlay"

export default {
  title: "Pages/Overlay",
  component: Overlay,
  parameters: {
    layout: "fullscreen",
  },
} as Meta

export const Basic: Story = (args) => (
  <div style={{ height: "100vh", width: "100vw" }}>
    <Overlay {...args} />
  </div>
)
Basic.parameters = {
  storyshots: { disable: true },
}
