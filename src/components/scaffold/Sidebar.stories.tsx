import { Meta, Story } from "@storybook/react"

import Sidebar, { SidebarProps } from "components/scaffold/Sidebar"

export default {
  title: "Scaffold/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
} as Meta

export const Basic: Story<SidebarProps> = (args) => (
  <div style={{ height: "100vh", width: "100vw" }}>
    <Sidebar {...args} />
  </div>
)
