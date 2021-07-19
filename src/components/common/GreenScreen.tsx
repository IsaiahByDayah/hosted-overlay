import { makeStyles, Theme } from "@material-ui/core"
import cx from "clsx"

import { calculateAspectRatioVerticalPadding } from "lib/util"

type AspectRatio = string | number | (() => string | number)

interface StyleProps {
  aspectRatio: AspectRatio
}

const useStyles = makeStyles<Theme, StyleProps>(({ shape, shadows }) => ({
  root: ({ aspectRatio }) => ({
    backgroundColor: "#00ff00",
    borderRadius: shape.borderRadius,
    boxShadow: shadows[4],
    overflow: "hidden",

    width: "100%",
    minWidth: 100,
    height: 0,
    paddingBottom: calculateAspectRatioVerticalPadding(aspectRatio),
  }),
}))

export interface GreenScreenProps {
  className?: string
  aspectRatio?: AspectRatio
}

const GreenScreen = ({ className, aspectRatio = "16:9" }: GreenScreenProps) => {
  const classes = useStyles({ aspectRatio })

  return <div className={cx(classes.root, className)} />
}

export default GreenScreen
