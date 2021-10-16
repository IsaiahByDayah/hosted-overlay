import { useState, useEffect } from "react"
import { Stack, TextField } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { doc, updateDoc } from "firebase/firestore"

import firebase from "lib/firebase"

import { useCurrentUserOverlay } from "hooks/useOverlay"

import AdminField from "components/admin/AdminField"

const ChatDisplaySettings = () => {
  const overlay = useCurrentUserOverlay()
  const overlayDocRef = doc(firebase.firestore, `overlays/${overlay?.id}`)
  const chat = overlay?.chat

  const [channel, setChannel] = useState("")

  useEffect(() => {
    if (channel === "") setChannel(chat?.channel ?? "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat?.channel])

  const updateChannel = async () => {
    if (!channel.trim()) return
    await updateDoc(overlayDocRef, {
      "chat.channel": channel.trim(),
    })
    console.log("Chat Channel Updated!")
  }

  return (
    <AdminField
      title="Chat Display Settings"
      description="Manage display settings for the chat shown on stream"
    >
      <Stack direction="row" alignItems="baseline" spacing={2}>
        <TextField
          fullWidth
          variant="outlined"
          label="Channel Name"
          value={channel}
          onChange={(e) => {
            setChannel(e.currentTarget.value)
          }}
          InputLabelProps={{ shrink: true }}
          helperText="twitch.tv/{Channel Name}"
        />
        <LoadingButton
          variant="contained"
          loading={!overlay}
          onClick={() => updateChannel()}
        >
          Update
        </LoadingButton>
      </Stack>
    </AdminField>
  )
}

export default ChatDisplaySettings
