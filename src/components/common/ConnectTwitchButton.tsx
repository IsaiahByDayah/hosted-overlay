import { alpha } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { SiTwitch } from "react-icons/si"
import { updateDoc, deleteField } from "firebase/firestore"

import { TWITCH_IMPLICIT_OAUTH_URL } from "lib/twitch"

import { useCurrentStreamBot } from "hooks/useStreamBot"

const OpenOverlayButton = () => {
  const [streamBot, streamBotDocRef] = useCurrentStreamBot()

  const disconnectTwitch = () => {
    if (Boolean(streamBot)) {
      updateDoc(streamBotDocRef, {
        "twitchIntegration.auth": deleteField(),
      })
    }
  }

  if (!Boolean(streamBot?.twitchIntegration?.auth))
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
        Connect Bot
      </LoadingButton>
    )

  return (
    <LoadingButton
      sx={{
        color: "#9146FF",
        borderColor: "#9146FF",
        "&:hover": {
          backgroundColor: alpha("#9146FF", 0.04),
          borderColor: "#8205B4",
        },
      }}
      variant="outlined"
      endIcon={<SiTwitch />}
      loading={!streamBot}
      onClick={disconnectTwitch}
    >
      Disconnect {streamBot?.twitchIntegration?.auth?.username}
    </LoadingButton>
  )
}

export default OpenOverlayButton
