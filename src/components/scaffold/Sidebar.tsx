import { Stack } from "@mui/material"

import { getFakeChat } from "lib/util"

import useOverlayChat from "hooks/useOverlayChat"

import { useOverlayContext } from "components/scaffold/OverlayProvider"

import CurrentTopic from "components/widgets/CurrentTopic"
import Chat from "components/widgets/twitch-chat/Chat"

import GreenScreen from "components/common/GreenScreen"

const Sidebar = () => {
  const { overlay } = useOverlayContext()
  let messages = useOverlayChat({ channel: overlay?.chat?.channel })

  if (process.env.NODE_ENV === "test") {
    messages = getFakeChat({ seed: 123 })
  }

  return (
    <Stack
      spacing={2}
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        height: 1,
        backgroundColor: ({ overlay }) => overlay.sidebar,
      }}
    >
      <CurrentTopic />

      <Chat messages={messages} sx={{ flexGrow: 1 }} />

      <GreenScreen aspectRatio="4:3" />
    </Stack>
  )
}

export default Sidebar
