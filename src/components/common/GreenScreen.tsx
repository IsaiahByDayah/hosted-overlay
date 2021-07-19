import { makeStyles } from "@material-ui/core"
import cx from "clsx"

const useStyles = makeStyles({
  root: {},
})

export interface GreenScreenProps {
  className?: string
}

const GreenScreen = ({ className }: GreenScreenProps) => {
  const classes = useStyles()

  return <div className={cx(classes.root, className)} />
}

export default GreenScreen
