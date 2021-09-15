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
  channel?: string // Used for what chat to connect to for messages / commands / etc.

  currentTopic?: string // Displayed on the overlay

  socials?: { platform: SocialPlatform; handle: string }[] // Displayed in the status bar

  messages?: string | string[] // Message(s) to randomly cycle through the status bar
}
