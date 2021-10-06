import { useState, useEffect } from "react"
import {
  Stack,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Chip,
  FormControl,
  Typography,
  Container,
  Grid,
  chipClasses,
} from "@mui/material"
import { doc, updateDoc } from "firebase/firestore"

import firebase from "lib/firebase"
import {
  SOCIAL_PLATFORMS,
  SocialPlatform,
  TTS_LANGUAGES,
  TTSLanguage,
} from "lib/types"

import useOverlay from "hooks/useOverlay"

import { useAuthContext } from "components/scaffold/AuthProvider"

import Header from "components/common/Header"

import OverlayData from "components/admin/sections/OverlayData"
import ChannelPointRedemptions from "components/admin/sections/ChannelPointRedemptions"

const Admin = () => {
  const { user } = useAuthContext()
  const overlay = useOverlay(user?.uid)
  const overlayDocRef = doc(firebase.firestore, `overlays/${user?.uid}`)

  const [channel, setChannel] = useState("")

  useEffect(() => {
    if (channel === "") setChannel(overlay?.channel ?? "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overlay])

  const updateChannel = async () => {
    if (!channel.trim()) return
    await updateDoc(overlayDocRef, { channel: channel.trim() })
    console.log("Current Topic Updated!")
  }

  return (
    <div>
      <Header />
      <Container component={Stack} spacing={5} sx={{ py: 2 }}>
        <Typography fontWeight="bold" variant="h5" textAlign="center">
          Admin Panel
        </Typography>

        <OverlayData />

        <ChannelPointRedemptions />

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
              helperText="Used for chat, stream alerts, commands, channel point redemptions, etc."
            />
            <Button variant="contained" onClick={() => updateChannel()}>
              Update
            </Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  )
}

export default Admin
