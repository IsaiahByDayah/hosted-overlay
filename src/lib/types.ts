export interface Message {
  id: string
  username: string
  message: string
  color?: string
  sent?: boolean
}

export interface Task {
  id: string
  label: string
  description?: string
  completed?: boolean
}

export const SOCIAL_PLATFORMS = [
  "patreon",
  "tiktok",
  "twitch",
  "twitter",
  "youtube",
] as const
export type SocialPlatform = typeof SOCIAL_PLATFORMS[number]

export interface Overlay {
  currentTopic?: string
  socials?: { platform: SocialPlatform; handle: string }[]
}
