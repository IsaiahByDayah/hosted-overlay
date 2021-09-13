import { Meta, Story } from "@storybook/react"

import Admin from "components/pages/Admin"

export default {
  title: "Pages/Admin",
  component: Admin,
  parameters: {
    layout: "fullscreen",
  },
} as Meta

export const Basic: Story = (args) => (
  <div style={{ height: "100vh", width: "100vw" }}>
    <Admin {...args} />
  </div>
)
Basic.parameters = {
  storyshots: { disable: true },
}
