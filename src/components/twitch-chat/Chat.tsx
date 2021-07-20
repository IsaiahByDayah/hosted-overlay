import { useLayoutEffect, useRef } from "react"
import { makeStyles } from "@material-ui/core"
import cx from "clsx"

import { Message } from "lib/types"

import ChatMessage from "components/twitch-chat/ChatMessage"

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    flexGrow: 1,
    padding: spacing(2),
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    scrollbarGutter: "unset",
    alignItems: "flex-start",
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
  useData: () => Message[]
}

const Chat = ({ className, useData }: ChatProps) => {
  const classes = useStyles()
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const messages = useData()

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
    </div>
  )
}

export default Chat
