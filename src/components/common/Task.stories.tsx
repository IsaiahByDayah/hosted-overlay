import { Meta, Story } from "@storybook/react"

import Task, { TaskProps } from "components/common/Task"

export default {
  title: "Common/Task",
  component: Task,
  parameters: {
    layout: "centered",
  },
} as Meta

export const Basic: Story<TaskProps> = (args) => <Task {...args} />
Basic.args = {
  label: "Label",
  description: "labore dolorem minus",
  completed: false,
}
