import { makeStyles, Theme } from "@material-ui/core"
import cx from "clsx"

interface StyleProps {
  percent: number
}

const useStyles = makeStyles<Theme, StyleProps>(
  ({ palette, shape, shadows, spacing }) => ({
    root: {
      borderRadius: shape.borderRadius,
      boxShadow: shadows["4"],
      backgroundColor: palette.primary.contrastText,
      height: spacing(2),
      minWidth: 200,
      overflow: "hidden",
      padding: 0,
    },
    fill: ({ percent }) => ({
      backgroundColor: palette.primary.main,
      transition: "width 0.5s",
      height: "100%",
      width: `${Math.max(0, Math.min(100, percent * 100))}%`,
    }),
  })
)

export interface ProgressBarProps {
  className?: string
  percent: number
}

const ProgressBar = ({ className, percent = 0 }: ProgressBarProps) => {
  const classes = useStyles({ percent })

  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.fill} />
    </div>
  )
}

export default ProgressBar
