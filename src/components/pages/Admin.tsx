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

const Admin = () => {
  const { user } = useAuthContext()
  const overlay = useOverlay(user?.uid)

  const [currentTopic, setCurrentTopic] = useState(overlay?.currentTopic)
  const [newCurrentTopic, setNewCurrentTopic] = useState("")
  const overlayDocRef = doc(firebase.firestore, `overlays/${user?.uid}`)

  const [channel, setChannel] = useState("")

  const [socialPlatform, setSocialPlatform] = useState<SocialPlatform>("twitch")
  const [socialHandle, setSocialHandle] = useState("")

  const [message, setMessage] = useState("")

  const [ttsLangauge, setTTSLanguage] =
    useState<TTSLanguage>("american-english")
  const [ttsCustomId, setTTSCustomId] = useState("")

  useEffect(() => {
    if (newCurrentTopic === "") {
      setCurrentTopic(overlay?.currentTopic ?? "")
      if (newCurrentTopic === "")
        setNewCurrentTopic(overlay?.currentTopic ?? "")
      if (channel === "") setChannel(overlay?.channel ?? "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overlay])

  const updateCurrentTopic = async () => {
    if (newCurrentTopic.trim() === currentTopic?.trim()) return
    await updateDoc(overlayDocRef, { currentTopic: newCurrentTopic })
    console.log("Current Topic Updated!")
  }

  const updateChannel = async () => {
    if (!channel.trim()) return
    await updateDoc(overlayDocRef, { channel: channel.trim() })
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
  const removeSocial = async (platform: SocialPlatform, handle: string) => {
    await updateDoc(overlayDocRef, {
      socials: (overlay?.socials ?? []).filter(
        (social) => !(social.platform === platform && social.handle === handle)
      ),
    })
    console.log("Social Platform Removed!")
  }

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

  const addTTSRedemption = async () => {
    if (!ttsCustomId.trim()) return
    await updateDoc(overlayDocRef, {
      ttsRedemptions: [
        ...(overlay?.ttsRedemptions ?? []),
        {
          customRewardId: ttsCustomId,
          langauge: ttsLangauge,
        },
      ],
    })
    console.log("Message Added!")
  }
  const removeTTSRedemption = async (customId: string) => {
    await updateDoc(overlayDocRef, {
      ttsRedemptions: (overlay?.ttsRedemptions ?? []).filter(
        (r) => !(r.customRewardId === customId)
      ),
    })
    console.log("Message Removed!")
  }

  return (
    <div>
      <Header />
      <Container component={Stack} spacing={5} sx={{ py: 2 }}>
        <Typography fontWeight="bold" variant="h5">
          Admin Panel
        </Typography>

        {/* Sidebar Section */}
        <Stack spacing={2}>
          <Typography fontWeight="bold">Sidebar Data</Typography>

          <Stack direction="row" alignItems="baseline" spacing={2}>
            <TextField
              fullWidth
              variant="outlined"
              label="Current Topic"
              value={newCurrentTopic}
              onChange={(e) => {
                setNewCurrentTopic(e.currentTarget.value)
              }}
              InputLabelProps={{ shrink: true }}
            />
            <Button variant="contained" onClick={() => updateCurrentTopic()}>
              Update
            </Button>
          </Stack>

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

          <Stack direction="row" alignItems="baseline" spacing={2}>
            <TextField
              fullWidth
              variant="outlined"
              label="Custom Reward Id"
              value={ttsCustomId}
              onChange={(e) => {
                setTTSCustomId(e.currentTarget.value)
              }}
              InputLabelProps={{ shrink: true }}
            />
            <FormControl sx={{ flexShrink: 0 }} variant="outlined">
              <InputLabel id="tts-language-select-label">Language</InputLabel>
              <Select
                labelId="tts-langauge-select-label"
                label="Language"
                value={ttsLangauge}
                onChange={(e) => {
                  setTTSLanguage(e.target.value as TTSLanguage)
                }}
              >
                {TTS_LANGUAGES.map((language) => (
                  <MenuItem key={language} value={language}>
                    {language}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={() => addTTSRedemption()}>
              Add
            </Button>
          </Stack>

          <Grid container columnSpacing={2} rowSpacing={1}>
            {overlay?.ttsRedemptions?.map((redemption) => (
              <Grid key={redemption.customRewardId} item xs="auto">
                <Chip
                  label={`${redemption.customRewardId} - ${redemption.langauge}`}
                  onDelete={() =>
                    removeTTSRedemption(redemption.customRewardId)
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Stack>

        {/* Status Bar Section */}
        <Stack spacing={2}>
          <Typography fontWeight="bold">Status Bar Data</Typography>

          <Stack direction="row" alignItems="baseline" spacing={2}>
            <FormControl sx={{ flexShrink: 0 }} variant="outlined">
              <InputLabel id="social-platform-select-label">
                Platform
              </InputLabel>
              <Select
                labelId="social-platform-select-label"
                label="Platform"
                value={socialPlatform}
                onChange={(e) => {
                  setSocialPlatform(e.target.value as SocialPlatform)
                }}
              >
                {SOCIAL_PLATFORMS.map((platform) => (
                  <MenuItem key={platform} value={platform}>
                    {platform}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              variant="outlined"
              label="Handle"
              value={socialHandle}
              onChange={(e) => {
                setSocialHandle(e.currentTarget.value)
              }}
              InputLabelProps={{ shrink: true }}
            />
            <Button variant="contained" onClick={() => addSocial()}>
              Add
            </Button>
          </Stack>

          <Grid container columnSpacing={2} rowSpacing={1}>
            {overlay?.socials?.map((social) => (
              <Grid key={`${social.platform}-${social.handle}`} item xs="auto">
                <Chip
                  label={`${social.platform} - ${social.handle}`}
                  onDelete={() => removeSocial(social.platform, social.handle)}
                />
              </Grid>
            ))}
          </Grid>

          <Stack direction="row" alignItems="baseline" spacing={2}>
            <TextField
              fullWidth
              variant="outlined"
              label="Message"
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
        </Stack>
      </Container>
    </div>
  )
}

export default Admin
