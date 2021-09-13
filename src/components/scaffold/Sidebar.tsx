import { makeStyles } from "@material-ui/core"
import cx from "clsx"

import useChat from "hooks/useChat"
import useFakeChat from "hooks/useFakeChat"

import CurrentTopic from "components/widgets/CurrentTopic"
import Chat from "components/widgets/twitch-chat/Chat"

import GreenScreen from "components/common/GreenScreen"

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    padding: spacing(3),
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: palette.augmentColor({ main: palette.background.default })
      .dark,
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

const useLiveData = () =>
  useChat({ channel: process.env.REACT_APP_USERNAME ?? "" })

const useFakeData = () => useFakeChat({ seed: 123 })

const useData =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
    ? useFakeData
    : useLiveData

export interface SidebarProps {
  className?: string
}

const Sidebar = ({ className }: SidebarProps) => {
  const classes = useStyles()

  return (
    <div className={cx(classes.root, className)}>
      <CurrentTopic className={classes.currentTopic} />

      <Chat className={classes.chat} useData={useData} />

      <GreenScreen className={classes.webcam} aspectRatio="4:3" />
    </div>
  )
}

export default Sidebar
