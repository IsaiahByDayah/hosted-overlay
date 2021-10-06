import { useLayoutEffect, useRef } from "react"
import { Stack, Box } from "@mui/material"
import { alpha } from "@mui/material/styles"
import { SxProps, Theme } from "@mui/system"

import { Message } from "lib/types"

import ChatMessage from "components/widgets/twitch-chat/ChatMessage"

export interface ChatProps {
  sx?: SxProps<Theme> | undefined
  messages: Message[]
  fade?: boolean
  fadeColor?: string
}

const Chat = ({ sx, messages, fade = true, fadeColor }: ChatProps) => {
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  })

  return (
    <Box
      py={2}
      px={1}
      display="flex"
      sx={{
        overflow: "hidden",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        scrollbarGutter: "unset",
        position: "relative",
        ...sx,
      }}
      ref={chatContainerRef}
    >
      <Stack
        spacing={1}
        flexGrow={1}
        alignItems="flex-start"
        justifyContent="flex-end"
        sx={
          {
            // overflow: "hidden",
            // scrollbarWidth: "none",
            // msOverflowStyle: "none",
            // scrollbarGutter: "unset",
            // position: "relative",
          }
        }
      >
        {messages.map((message, index) => {
          return (
            <ChatMessage
              key={index}
              sx={{
                width: "80%",
                alignSelf: message.sent ? "flex-end" : undefined,
              }}
              message={message}
            />
          )
        })}
      </Stack>
      {fade && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: ({ overlay }) =>
              `linear-gradient(0deg, transparent 84%, ${alpha(
                fadeColor ?? overlay.sidebar,
                1
              )} 95%)`,
          }}
        />
      )}
    </Box>
  )
}

export default Chat
