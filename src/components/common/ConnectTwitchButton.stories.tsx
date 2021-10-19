import { Meta, Story } from "@storybook/react"

import ConnectTwitchButton from "components/common/ConnectTwitchButton"

export default {
  title: "Common/Connect Twitch Button",
  component: ConnectTwitchButton,
} as Meta

export const Basic: Story = (args) => <ConnectTwitchButton {...args} />
