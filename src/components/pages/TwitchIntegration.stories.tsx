import { Meta, Story } from "@storybook/react"

import TwitchIntegration from "components/pages/TwitchIntegration"

export default {
  title: "Pages/Twitch Integration",
  component: TwitchIntegration,
  parameters: {
    layout: "fullscreen",
  },
} as Meta

export const Basic: Story = (args) => (
  <div style={{ height: "100vh", width: "100vw" }}>
    <TwitchIntegration {...args} />
  </div>
)
Basic.parameters = {
  storyshots: { disable: true },
}
