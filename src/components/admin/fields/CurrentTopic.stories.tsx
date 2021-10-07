import { Meta, Story } from "@storybook/react"

import CurrentTopic from "components/admin/fields/CurrentTopic"

export default {
  title: "Admin/Fields/Current Topic",
  component: CurrentTopic,
} as Meta

export const Basic: Story = (args) => <CurrentTopic {...args} />
