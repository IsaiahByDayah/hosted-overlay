import { Stack } from "@mui/material"
import { SxProps, Theme } from "@mui/system"

import { Task as ITask } from "lib/types"

import Task from "components/common/Task"

export interface TasksProps {
  sx?: SxProps<Theme> | undefined
  tasks?: ITask[]
}

const Tasks = ({ sx, tasks }: TasksProps) => {
  const incompleteTasks = tasks?.filter((task) => !task.completed)
  const completeTasks = tasks?.filter((task) => task.completed)

  return (
    <Stack direction="row" spacing={2} sx={sx}>
      {incompleteTasks?.map((task) => (
        <Task
          key={task.id}
          label={task.label}
          description={task.description}
          completed={task.completed}
        />
      ))}
      {completeTasks?.map((task) => (
        <Task
          key={task.id}
          label={task.label}
          description={task.description}
          completed={task.completed}
        />
      ))}
    </Stack>
  )
}

export default Tasks
