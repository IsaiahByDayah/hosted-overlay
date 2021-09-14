import { Meta, Story } from "@storybook/react"

import SignedIn from "components/common/SignedIn"

export default {
  title: "Common/SignedIn",
  component: SignedIn,
} as Meta

export const Basic: Story = () => (
  <SignedIn>Only visible when signed in!</SignedIn>
)
