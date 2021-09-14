import { makeStyles, Typography } from "@material-ui/core"
import { IconType } from "react-icons"
import {
  SiTiktok,
  SiTwitter,
  SiYoutube,
  SiTwitch,
  SiPatreon,
} from "react-icons/si"
import { FaRegUser } from "react-icons/fa"
import cx from "clsx"

import { SocialPlatform } from "lib/types"

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  label: {
    marginLeft: spacing(),
  },
}))

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
  className?: string
  platform: SocialPlatform
  label: string
}

const SocialProfile = ({ className, platform, label }: SocialProfileProps) => {
  const classes = useStyles()

  const Icon = getIcon(platform)

  return (
    <div className={cx(classes.root, className)}>
      <Icon />
      <Typography className={classes.label}>{label}</Typography>
    </div>
  )
}

export default SocialProfile
