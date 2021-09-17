import { Meta, Story } from "@storybook/react"

import MainSection from "components/scaffold/MainSection"

export default {
  title: "Scaffold/MainSection",
  component: MainSection,
  parameters: {
    layout: "fullscreen",
  },
} as Meta

export const Basic: Story = () => (
  <div style={{ height: "100vh", width: "100vw" }}>
    <MainSection />
  </div>
)
Basic.parameters = {
  storyshots: { disable: true },
}
