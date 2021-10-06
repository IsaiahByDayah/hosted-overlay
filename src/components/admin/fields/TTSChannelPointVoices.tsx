import { useState } from "react"
import {
  Stack,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Chip,
  FormControl,
  Grid,
} from "@mui/material"
import { doc, updateDoc } from "firebase/firestore"

import firebase from "lib/firebase"
import { TTS_LANGUAGES, TTSLanguage } from "lib/types"

import useOverlay from "hooks/useOverlay"

import { useAuthContext } from "components/scaffold/AuthProvider"

import AdminField from "components/admin/AdminField"

const TTSChannelPointVoices = () => {
  const { user } = useAuthContext()
  const overlay = useOverlay(user?.uid)
  const overlayDocRef = doc(firebase.firestore, `overlays/${user?.uid}`)

  const [ttsLangauge, setTTSLanguage] =
    useState<TTSLanguage>("american-english")
  const [ttsCustomId, setTTSCustomId] = useState("")

  const addTTSRedemption = async () => {
    // if (!ttsCustomId.trim()) return
    // await updateDoc(overlayDocRef, {
    //   ttsRedemptions: [
    //     ...(overlay?.ttsRedemptions ?? []),
    //     {
    //       customRewardId: ttsCustomId,
    //       langauge: ttsLangauge,
    //     },
    //   ],
    // })
    console.log("TTS Redemption Added!")
  }
  const removeTTSRedemption = async (customId: string) => {
    // await updateDoc(overlayDocRef, {
    //   ttsRedemptions: (overlay?.ttsRedemptions ?? []).filter(
    //     (r) => !(r.customRewardId === customId)
    //   ),
    // })
    console.log("TTS Redemption Removed!")
  }

  return (
    <AdminField
      title="Text-to-Speech Voices"
      description="Manage what channel point redemptions connect to which language"
    >
      <Stack spacing={2}>
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

        {/* {Boolean(overlay?.ttsRedemptions?.length) && (
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
        )} */}
      </Stack>
    </AdminField>
  )
}

export default TTSChannelPointVoices
