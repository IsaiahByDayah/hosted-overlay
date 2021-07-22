import { Meta, Story } from "@storybook/react"

import Tasks, { TasksProps } from "components/widgets/Tasks"

export default {
  title: "Widgets/Tasks",
  component: Tasks,
  parameters: {
    layout: "centered",
  },
} as Meta

export const Basic: Story<TasksProps> = (args) => <Tasks {...args} />
Basic.parameters = {
  // storyshots: { disable: true },
}
