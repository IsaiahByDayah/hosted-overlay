import { makeStyles } from "@material-ui/core"
import cx from "clsx"

import Task from "components/common/Task"

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}))

export interface TasksProps {
  className?: string
}

const Tasks = ({ className }: TasksProps) => {
  const classes = useStyles()
  return (
    <div className={cx(classes.root, className)}>
      <Task
        label="Finish Overlay Layout"
        description="Rebuild our prototype overlay using ReactJS & Material UI"
        completed
      />
    </div>
  )
}

export default Tasks
