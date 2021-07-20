import { makeStyles, Typography, Paper } from "@material-ui/core"
import cx from "clsx"

import useChat, { useFakeChat } from "hooks/useChat"

import Chat from "components/twitch-chat/Chat"

import GreenScreen from "components/common/GreenScreen"

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    padding: spacing(3),
    display: "flex",
    flexDirection: "column",
    height: "100%",
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

  // const useData = () =>
  //   useChat({ channel: process.env.REACT_APP_USERNAME ?? "" })

  const useData = () => useFakeChat({ seed: 123 })

  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.currentTopic}>
        <Typography align="center">Current Topic</Typography>
        <Paper style={{ height: 64, width: "100%" }} />
      </div>

      <Chat className={classes.chat} useData={useData} />

      <GreenScreen className={classes.webcam} aspectRatio="4:3" />
    </div>
  )
}

export default Sidebar
