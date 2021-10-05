import { Box, Typography } from "@mui/material"
import { IconType } from "react-icons"
import {
  SiTiktok,
  SiTwitter,
  SiYoutube,
  SiTwitch,
  SiPatreon,
} from "react-icons/si"
import { FaRegUser } from "react-icons/fa"

import { SocialPlatform } from "lib/types"

const getIcon = (platform: SocialPlatform): IconType => {
  switch (platform) {
    case "tiktok":
      return SiTiktok
    case "twitter":
      return SiTwitter
    case "twitch":
      return SiTwitch
    case "youtube":
      return SiYoutube
    case "patreon":
      return SiPatreon
    default:
      return FaRegUser
  }
}

export interface SocialProfileProps {
  platform: SocialPlatform
  label: string
}

const SocialProfile = ({ platform, label }: SocialProfileProps) => {
  const Icon = getIcon(platform)

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Icon />
      <Typography sx={{ ml: 1.5 }}>{label}</Typography>
    </Box>
  )
}

export default SocialProfile
