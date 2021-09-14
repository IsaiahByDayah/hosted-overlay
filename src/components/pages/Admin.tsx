import { useState, useEffect } from "react"
import {
  Box,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Chip,
  FormControl,
} from "@material-ui/core"
import { doc, updateDoc } from "firebase/firestore"

import firebase from "lib/firebase"
import { SOCIAL_PLATFORMS, SocialPlatform } from "lib/types"

import useOverlay from "hooks/useOverlay"

import { useAuthContext } from "components/scaffold/AuthProvider"

const Admin = () => {
  const { user } = useAuthContext()
  const overlay = useOverlay(user?.uid)

  const [currentTopic, setCurrentTopic] = useState(overlay?.currentTopic)
  const [newCurrentTopic, setNewCurrentTopic] = useState("")
  var overlayDocRef = doc(firebase.firestore, `overlays/${user?.uid}`)

  const [socialPlatform, setSocialPlatform] = useState<SocialPlatform>("twitch")
  const [socialHandle, setSocialHandle] = useState("")

  useEffect(() => {
    if (newCurrentTopic === "") {
      setCurrentTopic(overlay?.currentTopic ?? "")
      if (newCurrentTopic === "")
        setNewCurrentTopic(overlay?.currentTopic ?? "")
    }
  }, [newCurrentTopic, overlay])

  const updateCurrentTopic = async () => {
    if (newCurrentTopic.trim() === currentTopic?.trim()) return
    await updateDoc(overlayDocRef, { currentTopic: newCurrentTopic })
    console.log("Current Topic Updated!")
  }

  const addSocial = async () => {
    if (!socialHandle.trim()) return
    await updateDoc(overlayDocRef, {
      socials: [
        ...(overlay?.socials ?? []),
        { platform: socialPlatform, handle: socialHandle },
      ],
    })
    console.log("Social Platform Added!")
  }
  const removeSocial = async () => {
    if (!socialHandle.trim()) return
    await updateDoc(overlayDocRef, {
      socials: (overlay?.socials ?? []).filter(
        (social) =>
          !(
            social.platform === socialPlatform && social.handle === socialHandle
          )
      ),
    })
    console.log("Social Platform Removed!")
  }

  return (
    <div>
      <div>
        <TextField
          label="Current Topic"
          value={newCurrentTopic}
          onChange={(e) => {
            setNewCurrentTopic(e.currentTarget.value)
          }}
          InputLabelProps={{ shrink: true }}
        />
        <Button onClick={() => updateCurrentTopic()}>Update</Button>
      </div>

      <Box mt={4}>
        <div>
          <FormControl variant="outlined">
            <InputLabel id="social-platform-select-label">Platform</InputLabel>
            <Select
              labelId="social-platform-select-label"
              label="Platform"
              value={socialPlatform}
              onChange={(e) => {
                setSocialPlatform(e.target.value as SocialPlatform)
              }}
            >
              {SOCIAL_PLATFORMS.map((platform) => (
                <MenuItem value={platform}>{platform}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Handle"
            value={socialHandle}
            onChange={(e) => {
              setSocialHandle(e.currentTarget.value)
            }}
            InputLabelProps={{ shrink: true }}
          />
          <Button onClick={() => addSocial()}>Add</Button>
          <Button onClick={() => removeSocial()}>Remove</Button>
        </div>
        <div>
          {overlay?.socials?.map((social) => (
            <Chip label={`${social.platform} - ${social.handle}`} />
          ))}
        </div>
      </Box>
    </div>
  )
}

export default Admin
