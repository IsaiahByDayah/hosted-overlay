import { Meta, Story } from "@storybook/react"

import Sidebar from "components/scaffold/Sidebar"

export default {
  title: "Scaffold/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
} as Meta

export const Basic: Story = () => (
  <div style={{ height: "100vh", width: "100vw" }}>
    <Sidebar />
  </div>
)
Basic.parameters = {
  storyshots: { disable: true },
}
