import { makeStyles, Theme, Typography } from "@material-ui/core"

interface StyleProps {
  color?: string
}

const useStyles = makeStyles<Theme, StyleProps>(({ spacing }) => ({
  root: {},
  username: ({ color }) => ({
    fontWeight: 700,
    color,
  }),
  message: {
    marginLeft: spacing(),
  },
}))

export interface ChatMessageProps {
  username: string
  message: string
  color?: string
}

const ChatMessage = ({ username, message, color }: ChatMessageProps) => {
  const classes = useStyles({ color })

  return (
    <div style={{ display: "flex", marginBottom: 16 }}>
      <Typography className={classes.username}>{username}: </Typography>{" "}
      <Typography className={classes.message}>{message}</Typography>
    </div>
  )
}

export default ChatMessage
