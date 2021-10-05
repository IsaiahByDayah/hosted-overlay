import { useLayoutEffect, useRef } from "react"
import { Stack, Box } from "@mui/material"
import { alpha } from "@mui/material/styles"
import { SxProps, Theme } from "@mui/system"

import { Message } from "lib/types"

import ChatMessage from "components/widgets/twitch-chat/ChatMessage"

export interface ChatProps {
  sx?: SxProps<Theme> | undefined
  messages: Message[]
}

const Chat = ({ sx, messages }: ChatProps) => {
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  })

  return (
    <Stack
      ref={chatContainerRef}
      spacing={1}
      alignItems="flex-start"
      justifyContent="flex-end"
      sx={{
        overflow: "hidden",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        scrollbarGutter: "unset",
        position: "relative",
        ...sx,
      }}
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
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: ({ palette }) =>
            `linear-gradient(0deg, transparent 84%, ${alpha(
              // palette.background.default,
              palette.augmentColor({
                color: { main: palette.background.default },
              }).dark,
              1
            )} 90%)`,
        }}
      />
    </Stack>
  )
}

export default Chat
