import { Meta, Story } from "@storybook/react"

import Home from "components/pages/Home"

export default {
  title: "Pages/Home",
  component: Home,
  parameters: {
    layout: "fullscreen",
  },
} as Meta

export const Basic: Story = (args) => (
  <div style={{ height: "100vh", width: "100vw" }}>
    <Home {...args} />
  </div>
)
Basic.parameters = {
  storyshots: { disable: true },
}
