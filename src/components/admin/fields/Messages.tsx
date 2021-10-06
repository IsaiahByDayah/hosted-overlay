import { useState } from "react"
import { Stack, TextField, Button, Chip, chipClasses } from "@mui/material"
import { doc, updateDoc } from "firebase/firestore"

import firebase from "lib/firebase"

import useOverlay from "hooks/useOverlay"

import { useAuthContext } from "components/scaffold/AuthProvider"

import AdminField from "components/admin/AdminField"

const Messages = () => {
  const { user } = useAuthContext()
  const overlay = useOverlay(user?.uid)
  const overlayDocRef = doc(firebase.firestore, `overlays/${user?.uid}`)

  const [message, setMessage] = useState("")
  const addMessage = async () => {
    if (!message.trim()) return
    await updateDoc(overlayDocRef, {
      messages: [...(overlay?.messages ?? []), message.trim()],
    })
    console.log("Message Added!")
  }
  const removeMessage = async (msg: string) => {
    await updateDoc(overlayDocRef, {
      messages: (overlay?.messages ?? []).filter((m) => !(msg === m)),
    })
    console.log("Message Removed!")
  }

  return (
    <AdminField
      title="Messages & Announcements"
      description="Rotating messages that are periodically displayed on stream"
    >
      <Stack spacing={2}>
        <Stack direction="row" alignItems="baseline" spacing={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Message Text"
            value={message}
            onChange={(e) => {
              setMessage(e.currentTarget.value)
            }}
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" onClick={() => addMessage()}>
            Add
          </Button>
        </Stack>

        {Boolean(overlay?.messages?.length) && (
          <Stack spacing={1}>
            {overlay?.messages?.map((m) => (
              <Chip
                key={m}
                label={m}
                onDelete={() => removeMessage(m)}
                sx={{
                  height: "auto",
                  padding: 1,
                  justifyContent: "space-between",
                  [`& .${chipClasses.label}`]: {
                    whiteSpace: "normal",
                  },
                }}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </AdminField>
  )
}

export default Messages
