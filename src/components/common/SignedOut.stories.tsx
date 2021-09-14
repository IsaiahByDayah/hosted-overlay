import { Meta, Story } from "@storybook/react"

import SignedOut from "components/common/SignedOut"

export default {
  title: "Common/SignedOut",
  component: SignedOut,
} as Meta

export const Basic: Story = () => (
  <SignedOut>Only visible when signed out!</SignedOut>
)
