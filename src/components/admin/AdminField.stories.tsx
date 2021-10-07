import { Meta, Story } from "@storybook/react"

import AdminField, { AdminFieldProps } from "components/admin/AdminField"

export default {
  title: "Admin/Admin Field",
  component: AdminField,
} as Meta

const Template: Story<AdminFieldProps> = (args) => <AdminField {...args} />

export const Uncontrolled = Template.bind({})
Uncontrolled.args = {
  title: "Field Title",
  description: "asperiores quod optio",
  children:
    "Laboriosam veniam quibusdam eum et dolorum. Nemo ut quis. Eligendi assumenda rerum.",
}

export const Controlled = Template.bind({})
Controlled.args = {
  expanded: false,
  title: "Field Title",
  description: "asperiores quod optio",
  children:
    "Laboriosam veniam quibusdam eum et dolorum. Nemo ut quis. Eligendi assumenda rerum.",
}
