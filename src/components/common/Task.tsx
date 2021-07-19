import { makeStyles, Typography } from "@material-ui/core"
import cx from "clsx"

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    padding: spacing(1),
  },
  label: {
    fontWeight: 900,
  },
  description: {
    fontWeight: 600,
  },
  completedLabel: {
    opacity: 0.54,
    textDecoration: "line-through",
  },
  completedDescription: {
    opacity: 0.54,
  },
}))

export interface TaskProps {
  className?: string
  label: string
  description?: string
  completed?: boolean
}

const Task = ({ className, label, description, completed }: TaskProps) => {
  const classes = useStyles()

  return (
    <div className={cx(classes.root, className)}>
      <Typography
        className={cx(classes.label, { [classes.completedLabel]: completed })}
      >
        {label}
      </Typography>
      {description && (
        <Typography
          className={cx(classes.description, {
            [classes.completedDescription]: completed,
          })}
          variant="body2"
        >
          {description}
        </Typography>
      )}
    </div>
  )
}

export default Task
