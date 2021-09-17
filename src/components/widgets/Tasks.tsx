import makeStyles from "@mui/styles/makeStyles"
import cx from "clsx"

import { Task as ITask } from "lib/types"

import Task from "components/common/Task"

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  task: {
    "&:not(:last-child)": {
      marginRight: spacing(2),
      marginBottom: spacing(2),
    },
  },
}))

export interface TasksProps {
  className?: string
  tasks?: ITask[]
}

const Tasks = ({ className, tasks }: TasksProps) => {
  const classes = useStyles()

  const incompleteTasks = tasks?.filter((task) => !task.completed)
  const completeTasks = tasks?.filter((task) => task.completed)

  return (
    <div className={cx(classes.root, className)}>
      {incompleteTasks?.map((task) => (
        <Task
          key={task.id}
          // className={classes.task}
          label={task.label}
          description={task.description}
          completed={task.completed}
        />
      ))}
      {completeTasks?.map((task) => (
        <Task
          key={task.id}
          // className={classes.task}
          label={task.label}
          description={task.description}
          completed={task.completed}
        />
      ))}
    </div>
  )
}

export default Tasks
