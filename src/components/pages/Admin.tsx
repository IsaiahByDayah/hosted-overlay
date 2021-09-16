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
  Typography,
  Container,
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
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

const useStyles = makeStyles(({ spacing }) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    gap: spacing(4),
  },
  pageTitle: {
    fontWeight: "bold",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: spacing(2),
  },
  sectionTitle: {
    fontWeight: "bold",
  },
  row: {
    gap: spacing(2),
  },
  noShrink: {
    flexShrink: 0,
  },
  bigChip: {
    height: "auto",
    padding: spacing(),
  },
  bigChipLabel: {
    whiteSpace: "normal",
  },
}))

const Admin = () => {
  const classes = useStyles()
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
      <Container className={classes.content} component={Box} mt={2}>
        <Typography className={classes.pageTitle} variant="h5">
          Admin Panel
        </Typography>

        {/* Sidebar Section */}
        <div className={classes.section}>
          <Typography className={classes.sectionTitle}>Sidebar Data</Typography>

          <Box className={classes.row} display="flex" alignItems="start">
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
          </Box>

          <Box className={classes.row} display="flex" alignItems="start">
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
          </Box>

          <Box className={classes.row} display="flex" alignItems="start">
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
            <FormControl className={classes.noShrink} variant="outlined">
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
          </Box>

          <Box
            className={classes.row}
            display="flex"
            alignItems="center"
            flexWrap="wrap"
          >
            {overlay?.ttsRedemptions?.map((redemption) => (
              <Chip
                key={redemption.customRewardId}
                label={`${redemption.customRewardId} - ${redemption.langauge}`}
                onDelete={() => removeTTSRedemption(redemption.customRewardId)}
              />
            ))}
          </Box>
        </div>

        {/* Status Bar Section */}
        <div className={classes.section}>
          <Typography className={classes.sectionTitle}>
            Status Bar Data
          </Typography>

          <Box className={classes.row} display="flex" alignItems="start">
            <FormControl className={classes.noShrink} variant="outlined">
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
          </Box>

          <Box
            className={classes.row}
            display="flex"
            alignItems="center"
            flexWrap="wrap"
          >
            {overlay?.socials?.map((social) => (
              <Chip
                key={`${social.platform}-${social.handle}`}
                label={`${social.platform} - ${social.handle}`}
                onDelete={() => removeSocial(social.platform, social.handle)}
              />
            ))}
          </Box>

          <Box className={classes.row} display="flex" alignItems="start">
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
          </Box>

          <Box
            className={classes.row}
            display="flex"
            alignItems="center"
            flexWrap="wrap"
          >
            {overlay?.messages?.map((m) => (
              <Chip
                key={m}
                className={classes.bigChip}
                label={m}
                onDelete={() => removeMessage(m)}
                classes={{ label: classes.bigChipLabel }}
              />
            ))}
          </Box>
        </div>
      </Container>
    </div>
  )
}

export default Admin
