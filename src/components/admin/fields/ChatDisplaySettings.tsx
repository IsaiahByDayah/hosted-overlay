import { useState, useEffect } from "react"
import { Stack, TextField, Button } from "@mui/material"
import { doc, updateDoc } from "firebase/firestore"

import firebase from "lib/firebase"

import useOverlay from "hooks/useOverlay"

import { useAuthContext } from "components/scaffold/AuthProvider"

import AdminField from "components/admin/AdminField"

const ChatDisplaySettings = () => {
  const { user } = useAuthContext()
  const overlay = useOverlay(user?.uid)
  const overlayDocRef = doc(firebase.firestore, `overlays/${user?.uid}`)
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
        <Button variant="contained" onClick={() => updateChannel()}>
          Update
        </Button>
      </Stack>
    </AdminField>
  )
}

export default ChatDisplaySettings
