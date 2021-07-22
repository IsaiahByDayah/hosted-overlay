import { Meta, Story } from "@storybook/react"

import MainSection, { MainSectionProps } from "components/scaffold/MainSection"

export default {
  title: "Scaffold/MainSection",
  component: MainSection,
  parameters: {
    layout: "fullscreen",
  },
} as Meta

export const Basic: Story<MainSectionProps> = (args) => (
  <div style={{ height: "100vh", width: "100vw" }}>
    <MainSection {...args} />
  </div>
)
Basic.parameters = {
  storyshots: { disable: true },
}
