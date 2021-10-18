import { useState } from "react"
import { Stack, TextField, Chip, Grid } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { updateDoc } from "firebase/firestore"

import { useCurrentStreamBot } from "hooks/useStreamBot"

import AdminField from "components/admin/AdminField"

const StreamChannels = () => {
  const [streamBot, streamBotDocRef] = useCurrentStreamBot()

  const [channel, setChannel] = useState("")

  const addChannel = async () => {
    if (!channel.trim()) return
    await updateDoc(streamBotDocRef, {
      "twitchIntegration.channels": [
        channel,
        ...(streamBot?.twitchIntegration?.channels ?? []),
      ],
    })
    setChannel("")
    console.log("Channel Added!")
  }
  const removeChannel = async (value: string) => {
    await updateDoc(streamBotDocRef, {
      "twitchIntegration.channels": (
        streamBot?.twitchIntegration?.channels ?? []
      ).filter((c) => !(c === value)),
    })
    console.log("Channel Removed!")
  }

  return (
    <AdminField
      title="Twitch Channel(s)"
      description="Which twitch channel(s) the bot should run on"
    >
      <Stack spacing={2}>
        <Stack direction="row" alignItems="baseline" spacing={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Channel"
            value={channel}
            onChange={(e) => {
              setChannel(e.currentTarget.value)
            }}
            InputLabelProps={{ shrink: true }}
          />
          <LoadingButton
            variant="contained"
            loading={!streamBot}
            onClick={() => addChannel()}
          >
            Add
          </LoadingButton>
        </Stack>

        {Boolean(streamBot?.twitchIntegration?.channels?.length) && (
          <Grid container columnSpacing={2} rowSpacing={1}>
            {streamBot?.twitchIntegration?.channels?.map((c) => (
              <Grid key={c} item xs="auto">
                <Chip label={c} onDelete={() => removeChannel(c)} />
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </AdminField>
  )
}

export default StreamChannels
