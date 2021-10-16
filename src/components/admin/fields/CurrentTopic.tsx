import { useState, useEffect } from "react"
import { Stack, TextField } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { doc, updateDoc } from "firebase/firestore"

import firebase from "lib/firebase"

import { useCurrentUserOverlay } from "hooks/useOverlay"

import AdminField from "components/admin/AdminField"

const CurrentTopic = () => {
  const overlay = useCurrentUserOverlay()
  const overlayDocRef = doc(firebase.firestore, `overlays/${overlay?.id}`)

  const [currentTopic, setCurrentTopic] = useState(overlay?.currentTopic)
  const [newCurrentTopic, setNewCurrentTopic] = useState("")

  useEffect(() => {
    if (newCurrentTopic === "") {
      setCurrentTopic(overlay?.currentTopic ?? "")
      if (newCurrentTopic === "")
        setNewCurrentTopic(overlay?.currentTopic ?? "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overlay])

  const updateCurrentTopic = async () => {
    if (newCurrentTopic.trim() === currentTopic?.trim()) return
    await updateDoc(overlayDocRef, { currentTopic: newCurrentTopic })
    console.log("Current Topic Updated!")
  }

  return (
    <AdminField
      title="Stream Topic"
      description="Let people who just joined stream know what you're up to!"
    >
      <Stack direction="row" alignItems="baseline" spacing={2}>
        <TextField
          fullWidth
          variant="outlined"
          label="Currently..."
          placeholder="Having fun!"
          value={newCurrentTopic}
          onChange={(e) => {
            setNewCurrentTopic(e.currentTarget.value)
          }}
          InputLabelProps={{ shrink: true }}
        />
        <LoadingButton
          variant="contained"
          loading={!overlay}
          onClick={() => updateCurrentTopic()}
        >
          Update
        </LoadingButton>
      </Stack>
    </AdminField>
  )
}

export default CurrentTopic
