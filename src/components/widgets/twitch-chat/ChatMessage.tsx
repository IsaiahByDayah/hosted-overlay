import { Typography } from "@mui/material"
import { SxProps, Theme } from "@mui/system"

import { Message } from "lib/types"

export interface ChatMessageProps {
  sx?: SxProps<Theme> | undefined
  message: Message
}

const ChatMessage = ({ sx, message }: ChatMessageProps) => (
  <Typography
    sx={{
      padding: 1,
      display: "inline-block",
      background: ({ overlay }) => overlay.card,
      borderRadius: 1,
      boxShadow: ({ shadows }) => shadows[2],
      ...sx,
    }}
  >
    <Typography
      component="span"
      fontWeight={700}
      sx={{
        color: message.color,
        mr: 1,
      }}
    >
      {message.username}:{" "}
    </Typography>
    <Typography component="span">{message.message}</Typography>
  </Typography>
)

export default ChatMessage
