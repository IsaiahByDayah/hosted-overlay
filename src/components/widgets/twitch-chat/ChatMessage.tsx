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
      background: ({ palette }) => palette.background.paper,
      borderRadius: ({ shape }) => shape.borderRadius,
      boxShadow: ({ shadows }) => shadows[2],
      ...sx,
    }}
  >
    <Typography
      component="span"
      fontWeight={700}
      sx={{
        color: message.color,
      }}
    >
      {message.username}:
    </Typography>
    <Typography component="span" ml={1}>
      {message.message}
    </Typography>
  </Typography>
)

export default ChatMessage
