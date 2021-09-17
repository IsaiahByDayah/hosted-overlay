import { useState, useEffect } from "react"
import { Typography } from "@mui/material"
import makeStyles from "@mui/styles/makeStyles"
import cx from "clsx"

import { useOverlayContext } from "components/scaffold/OverlayProvider"

import SocialProfile from "components/common/SocialProfile"

const useStyles = makeStyles(({ spacing, palette, shape, transitions }) => ({
  root: {
    padding: spacing(1, 0),
    backgroundColor: palette.augmentColor({
      color: { main: palette.background.default },
    }).dark,
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
    whiteSpace: "nowrap",
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
  // switch (index) {
  //   case 0:
  //     return 5
  //   case 1:
  //     return 10
  //   default:
  //     return 10
  // }
}

const StatusBar = ({ className }: StatusBarProps) => {
  const classes = useStyles()
  const [index, setIndex] = useState(0)
  const { overlay } = useOverlayContext()
  const [message, setMessage] = useState<string | undefined>(undefined)

  const messagesHash = overlay?.messages?.join() ?? ""

  useEffect(() => {
    const seconds = getWaitTimeSeconds(index)

    const timeout = window.setTimeout(() => {
      let newIndex = index + 1

      // Messages check and assignment
      if (newIndex === 1) {
        let randomMessage =
          overlay?.messages?.[
            Math.floor(Math.random() * overlay?.messages?.length)
          ]
        setMessage(randomMessage)
        if (!randomMessage) newIndex += 1
      }

      if (newIndex > MAX_INDEX) newIndex = 0
      setIndex(newIndex)
    }, seconds * 1000)

    return () => {
      window.clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, messagesHash])

  if (!overlay || !overlay.socials?.length || !overlay.messages?.length)
    return null

  return (
    <div className={cx(classes.root, className)}>
      <div className={cx(classes.socials, { [classes.hidden]: index !== 0 })}>
        {overlay?.socials?.map((social) => (
          <SocialProfile
            key={`${social.platform}-${social.handle}`}
            // className={classes.social}
            platform={social.platform}
            label={social.handle}
          />
        ))}
      </div>

      <div
        className={cx(classes.messageContainer, {
          [classes.hidden]: index !== 1,
        })}
      >
        {/* <Typography className={classes.message}>
          Highlighted messages are now spoken on stream! Redeem those channel
          points!
        </Typography> */}
        {/* <Typography className={classes.message}>
          Follow me on Twitter or Patreon for game dev updates and sneak peak at
          new features! Patreon.com/IsaiahByDayah
        </Typography> */}
        <Typography className={classes.message}>{message}</Typography>
      </div>
    </div>
  )
}

export default StatusBar
