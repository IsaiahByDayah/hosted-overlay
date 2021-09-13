import { useState, useEffect } from "react"
import { TextField, Button } from "@material-ui/core"
import { doc, updateDoc } from "firebase/firestore"

import firebase from "lib/firebase"

import useOverlay from "hooks/useOverlay"

import { useAuthContext } from "components/scaffold/AuthProvider"

const Admin = () => {
  const { user } = useAuthContext()
  const overlay = useOverlay(user?.uid)

  const [currentTopic, setCurrentTopic] = useState(overlay?.currentTopic)
  const [newCurrentTopic, setNewCurrentTopic] = useState("")
  var overlayDocRef = doc(firebase.firestore, `overlays/${user?.uid}`)

  useEffect(() => {
    if (newCurrentTopic === "") {
      setCurrentTopic(overlay?.currentTopic ?? "")
    }
  }, [newCurrentTopic, overlay])

  const updateCurrentTopic = async () => {
    await updateDoc(overlayDocRef, { currentTopic: newCurrentTopic })
    console.log("Current Topic Updated!")
    setNewCurrentTopic("")
  }

  return (
    <div>
      <TextField
        label="Current Topic"
        value={newCurrentTopic === "" ? currentTopic : newCurrentTopic}
        onChange={(e) => {
          setNewCurrentTopic(e.currentTarget.value)
        }}
        InputLabelProps={{ shrink: true }}
      />
      <Button onClick={() => updateCurrentTopic()}>Update</Button>
    </div>
  )
}

export default Admin
