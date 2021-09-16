import { useLayoutEffect, useRef } from "react"
import makeStyles from "@mui/styles/makeStyles"
import { alpha } from "@mui/material/styles"
import cx from "clsx"

import { Message } from "lib/types"

import ChatMessage from "components/widgets/twitch-chat/ChatMessage"

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    scrollbarGutter: "unset",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    position: "relative",
  },

  fade: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: `linear-gradient(0deg, transparent 84%, ${alpha(
      // palette.background.default,
      palette.augmentColor({ color: { main: palette.background.default } })
        .dark,
      1
    )} 90%)`,
  },

  message: {
    width: "80%",

    margin: spacing(1, 0),
    "&:first-child": {
      marginTop: 0,
    },

    "&:last-child": {
      marginBottom: 0,
    },
  },

  sent: {
    alignSelf: "flex-end",
  },
}))

export interface ChatProps {
  className?: string
  messages: Message[]
}

const Chat = ({ className, messages }: ChatProps) => {
  const classes = useStyles()
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  })

  return (
    <div className={cx(classes.root, className)} ref={chatContainerRef}>
      {messages.map((message, index) => {
        return (
          <ChatMessage
            key={index}
            className={cx(classes.message, {
              [classes.sent]: message.sent,
            })}
            message={message}
          />
        )
      })}
      <div className={classes.fade} />
    </div>
  )
}

export default Chat
