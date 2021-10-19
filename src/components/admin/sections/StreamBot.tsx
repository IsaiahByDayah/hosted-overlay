import { Stack, Typography } from "@mui/material"

import useValidTwitchToken from "hooks/useValidTwitchToken"

import AdminSection from "components/admin/AdminSection"
import StreamChannels from "components/admin/fields/StreamChannels"
import ChatCommands from "components/admin/fields/ChatCommands"

import StreamBotWidget from "components/widgets/StreamBotWidget"

import ConnectTwitchButton from "components/common/ConnectTwitchButton"

const StreamBot = () => {
  useValidTwitchToken()

  return (
    <AdminSection
      title={
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          flexGrow={1}
          alignItems="end"
        >
          <Typography fontWeight="bold">Stream Bot</Typography>
          <StreamBotWidget />
          <ConnectTwitchButton />
        </Stack>
      }
    >
      <StreamChannels />
      <ChatCommands />
    </AdminSection>
  )
}

export default StreamBot
