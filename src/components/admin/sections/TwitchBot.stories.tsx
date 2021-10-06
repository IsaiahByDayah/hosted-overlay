import { Meta, Story } from "@storybook/react"

import TwitchBot from "components/admin/sections/TwitchBot"

export default {
  title: "Admin/Sections/Twitch Bot",
  component: TwitchBot,
} as Meta

export const Basic: Story = (args) => <TwitchBot {...args} />
