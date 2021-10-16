import { useState } from "react"
import {
  Stack,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  FormControl,
  Grid,
} from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { doc, updateDoc } from "firebase/firestore"

import firebase from "lib/firebase"
import { SOCIAL_PLATFORMS, SocialPlatform } from "lib/types"

import { useCurrentUserOverlay } from "hooks/useOverlay"

import AdminField from "components/admin/AdminField"

const Socialhandles = () => {
  const overlay = useCurrentUserOverlay()
  const overlayDocRef = doc(firebase.firestore, `overlays/${overlay?.id}`)

  const [socialPlatform, setSocialPlatform] = useState<SocialPlatform>("twitch")
  const [socialHandle, setSocialHandle] = useState("")

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

  return (
    <AdminField
      title="Social Handles"
      description="Let people know where they can find you online!"
    >
      <Stack spacing={2}>
        <Stack direction="row" alignItems="baseline" spacing={2}>
          <FormControl sx={{ flexShrink: 0 }} variant="outlined">
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
          <LoadingButton
            variant="contained"
            loading={!overlay}
            onClick={() => addSocial()}
          >
            Add
          </LoadingButton>
        </Stack>

        {Boolean(overlay?.socials?.length) && (
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
        )}
      </Stack>
    </AdminField>
  )
}

export default Socialhandles
