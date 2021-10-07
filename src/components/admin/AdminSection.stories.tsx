import { Meta, Story } from "@storybook/react"

import AdminSection, { AdminSectionProps } from "components/admin/AdminSection"
import AdminField from "components/admin/AdminField"

export default {
  title: "Admin/Admin Section",
  component: AdminSection,
} as Meta

export const Basic: Story<AdminSectionProps> = (args) => (
  <AdminSection {...args} />
)
Basic.args = {
  title: "Section Title",
  children: (
    <>
      <AdminField title="Field 1">Field 1 Body</AdminField>
      <AdminField title="Field 2">Field 2 Body</AdminField>
      <AdminField title="Field 3">Field 3 Body</AdminField>
    </>
  ),
}
