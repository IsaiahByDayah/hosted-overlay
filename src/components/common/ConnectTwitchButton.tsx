import { LoadingButton } from "@mui/lab"
import { SiTwitch } from "react-icons/si"

import { TWITCH_IMPLICIT_OAUTH_URL } from "lib/twitch"

import { useCurrentStreamBot } from "hooks/useStreamBots"

const OpenOverlayButton = () => {
  const [streamBot] = useCurrentStreamBot()

  if (Boolean(streamBot?.twitchIntegration?.auth)) return null

  return (
    <LoadingButton
      sx={{
        color: "#F0F0FF",
        backgroundColor: "#9146FF",
        "&:hover": {
          backgroundColor: "#8205B4",
        },
      }}
      variant="contained"
      href={TWITCH_IMPLICIT_OAUTH_URL}
      endIcon={<SiTwitch />}
      loading={!streamBot}
    >
      Connect Twitch Bot
    </LoadingButton>
  )
}

export default OpenOverlayButton
