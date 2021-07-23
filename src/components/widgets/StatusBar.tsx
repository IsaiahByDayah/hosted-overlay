import { useState, useEffect } from "react"
import { makeStyles, Typography } from "@material-ui/core"
import cx from "clsx"

import SocialProfile from "components/common/SocialProfile"

const useStyles = makeStyles(({ spacing, palette, shape, transitions }) => ({
  root: {
    padding: spacing(1, 0),
    backgroundColor: palette.augmentColor({ main: palette.background.default })
      .dark,
    borderRadius: shape.borderRadius,
    overflow: "hidden",
  },

  socials: {
    display: "flex",
    justifyContent: "space-between",
    gap: spacing(5),
    padding: spacing(0, 2),

    opacity: 0,

    animationName: "$fadein",
    animationDuration: `${transitions.duration.standard}ms`,
    animationDelay: "2s",
    animationTimingFunction: transitions.easing.easeIn,
    animationFillMode: "forwards",
  },
  social: {
    "&:not(:last-child)": {
      marginRight: spacing(10),
    },
  },

  messageContainer: {
    overflow: "hidden",
    maxWidth: "100%",
  },
  message: {
    animation: "$marquee 30s linear 2s infinite",
    transform: "translate(100%, 0)",
  },
  "@keyframes fadein": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
  "@keyframes marquee": {
    "0%": { transform: "translate(100%, 0)" },
    "100%": { transform: "translate(-100%, 0)" },
  },

  hidden: {
    display: "none",
  },
}))

export interface StatusBarProps {
  className?: string
}

const MAX_INDEX = 1

const getWaitTimeSeconds = (index: number) => {
  switch (index) {
    case 0:
      return (2 + Math.random() * 3) * 60
    case 1:
      return 60
    default:
      return 60
  }
}

const StatusBar = ({ className }: StatusBarProps) => {
  const classes = useStyles()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const seconds = getWaitTimeSeconds(index)

    const timeout = window.setTimeout(() => {
      var newIndex = index + 1
      if (newIndex > MAX_INDEX) newIndex = 0
      setIndex(newIndex)
    }, seconds * 1000)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [index])

  return (
    <div className={cx(classes.root, className)}>
      <div className={cx(classes.socials, { [classes.hidden]: index !== 0 })}>
        <SocialProfile
          className={classes.social}
          platform="twitter"
          label="@IsaiahByDayah"
        />
        <SocialProfile
          className={classes.social}
          platform="twitch"
          label="/IsaiahByDayah"
        />
        <SocialProfile
          className={classes.social}
          platform="tiktok"
          label="IsaiahByDayah"
        />
        <SocialProfile
          className={classes.social}
          platform="youtube"
          label="/IsaiahSmith"
        />
      </div>

      <div
        className={cx(classes.messageContainer, {
          [classes.hidden]: index !== 1,
        })}
      >
        <Typography className={classes.message}>
          Here is some message to periodically show on stream!
        </Typography>
      </div>
    </div>
  )
}

export default StatusBar
