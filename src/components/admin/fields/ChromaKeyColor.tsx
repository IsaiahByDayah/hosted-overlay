import { useState, useEffect } from "react"
import { Stack, TextField, Button } from "@mui/material"
import { doc, updateDoc } from "firebase/firestore"

import firebase from "lib/firebase"

import useOverlay from "hooks/useOverlay"

import { useAuthContext } from "components/scaffold/AuthProvider"

import AdminField from "components/admin/AdminField"

const CurrentTopic = () => {
  const { user } = useAuthContext()
  const overlay = useOverlay(user?.uid)
  const overlayDocRef = doc(firebase.firestore, `overlays/${user?.uid}`)

  const [chromaKeyColor, setChromaKeyColor] = useState(overlay?.chromaKeyColor)
  const [newChromaKeyColor, setNewChromaKeyColor] = useState("")

  useEffect(() => {
    if (newChromaKeyColor === "") {
      setChromaKeyColor(overlay?.chromaKeyColor ?? "")
      if (newChromaKeyColor === "")
        setNewChromaKeyColor(overlay?.chromaKeyColor ?? "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overlay])

  const updateChromaKeyColor = async () => {
    if (newChromaKeyColor.trim() === chromaKeyColor?.trim()) return
    await updateDoc(overlayDocRef, { chromaKeyColor: newChromaKeyColor })
    console.log("Chroma Key Updated!")
  }

  return (
    <AdminField
      title="Chroma Key Color"
      description="Edit what color is used for GreenScreen widgets"
    >
      <Stack direction="row" alignItems="baseline" spacing={2}>
        <TextField
          fullWidth
          variant="outlined"
          label="Color (HEX value)"
          placeholder="#00FF00"
          value={newChromaKeyColor}
          onChange={(e) => {
            setNewChromaKeyColor(e.currentTarget.value)
          }}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" onClick={() => updateChromaKeyColor()}>
          Update
        </Button>
      </Stack>
    </AdminField>
  )
}

export default CurrentTopic
