import { Theme, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import cx from "clsx"

import { Message } from "lib/types"

interface StyleProps {
  color?: string
}

const useStyles = makeStyles<Theme, StyleProps>(
  ({ spacing, palette, shape, shadows }) => ({
    root: {
      padding: spacing(),
      display: "inline-block",
      background: palette.background.paper,
      borderRadius: shape.borderRadius,
      boxShadow: shadows[2],
    },
    username: ({ color }) => ({
      fontWeight: 700,
      color: color,
    }),
    message: {
      marginLeft: spacing(),
    },
  })
)

export interface ChatMessageProps {
  className?: string
  message: Message
}

const ChatMessage = ({ className, message }: ChatMessageProps) => {
  const classes = useStyles({ color: message.color })

  return (
    <Typography className={cx(classes.root, className)}>
      <span className={classes.username}>{message.username}: </span>
      <span className={classes.message}>{message.message}</span>
    </Typography>
  )
}

export default ChatMessage
