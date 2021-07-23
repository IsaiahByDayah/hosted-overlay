import { Meta, Story } from "@storybook/react"

import Tasks, { TasksProps } from "components/widgets/Tasks"

export default {
  title: "Widgets/Tasks",
  component: Tasks,
  parameters: {
    layout: "centered",
  },
} as Meta

export const Empty: Story<TasksProps> = (args) => <Tasks {...args} />
Empty.args = {
  tasks: [],
}

export const NoneComplete: Story<TasksProps> = (args) => <Tasks {...args} />
NoneComplete.args = {
  tasks: [
    {
      id: "1",
      label: "consequatur et veritatis",
      description: "Ratione voluptates eveniet eos autem vel delectus.",
    },
    {
      id: "2",
      label: "est corporis accusamus",
      description: "Autem suscipit molestias iste omnis.",
    },
    {
      id: "3",
      label: "nesciunt natus mollitia",
      description: "Est dolor autem perspiciatis dolores aut quo.",
    },
    {
      id: "4",
      label: "doloribus tempore cumque",
      description: "Et rerum quas officia consequatur ut quae voluptas.",
    },
    {
      id: "5",
      label: "accusantium dolore eum",
      description: "Perspiciatis non consequatur velit impedit quasi.",
    },
  ],
}

export const HalfComplete: Story<TasksProps> = (args) => <Tasks {...args} />
HalfComplete.args = {
  tasks: [
    {
      id: "1",
      label: "consequatur et veritatis",
      description: "Ratione voluptates eveniet eos autem vel delectus.",
      completed: true,
    },
    {
      id: "2",
      label: "est corporis accusamus",
      description: "Autem suscipit molestias iste omnis.",
      completed: true,
    },
    {
      id: "3",
      label: "nesciunt natus mollitia",
      description: "Est dolor autem perspiciatis dolores aut quo.",
    },
    {
      id: "4",
      label: "doloribus tempore cumque",
      description: "Et rerum quas officia consequatur ut quae voluptas.",
    },
    {
      id: "5",
      label: "accusantium dolore eum",
      description: "Perspiciatis non consequatur velit impedit quasi.",
    },
  ],
}

export const AllComplete: Story<TasksProps> = (args) => <Tasks {...args} />
AllComplete.args = {
  tasks: [
    {
      id: "1",
      label: "consequatur et veritatis",
      description: "Ratione voluptates eveniet eos autem vel delectus.",
      completed: true,
    },
    {
      id: "2",
      label: "est corporis accusamus",
      description: "Autem suscipit molestias iste omnis.",
      completed: true,
    },
    {
      id: "3",
      label: "nesciunt natus mollitia",
      description: "Est dolor autem perspiciatis dolores aut quo.",
      completed: true,
    },
    {
      id: "4",
      label: "doloribus tempore cumque",
      description: "Et rerum quas officia consequatur ut quae voluptas.",
      completed: true,
    },
    {
      id: "5",
      label: "accusantium dolore eum",
      description: "Perspiciatis non consequatur velit impedit quasi.",
      completed: true,
    },
  ],
}
