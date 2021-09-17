import makeStyles from "@mui/styles/makeStyles"
import cx from "clsx"

import { getFakeChat } from "lib/util"

import useOverlayChat from "hooks/useOverlayChat"

import { useOverlayContext } from "components/scaffold/OverlayProvider"

import CurrentTopic from "components/widgets/CurrentTopic"
import Chat from "components/widgets/twitch-chat/Chat"

import GreenScreen from "components/common/GreenScreen"

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    padding: spacing(3),
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: palette.augmentColor({
      color: {
        main: palette.background.default,
      },
    }).dark,
  },
  currentTopic: {
    flexShrink: 0,
    flexGrow: 0,
  },
  chat: {
    flexGrow: 1,
    margin: spacing(3, 0),
    padding: spacing(),
    overflow: "hidden",
  },
  webcam: {
    flexShrink: 0,
    flexGrow: 0,
  },
}))

export interface SidebarProps {
  className?: string
}

const Sidebar = ({ className }: SidebarProps) => {
  const classes = useStyles()
  const { overlay } = useOverlayContext()
  let messages = useOverlayChat({ channel: overlay?.channel })

  if (process.env.NODE_ENV === "test") {
    messages = getFakeChat({ seed: 123 })
  }

  return (
    <div className={cx(classes.root, className)}>
      <CurrentTopic className={classes.currentTopic} />

      <Chat className={classes.chat} messages={messages} />

      {/* <GreenScreen className={classes.webcam} aspectRatio="4:3" /> */}
    </div>
  )
}

export default Sidebar
