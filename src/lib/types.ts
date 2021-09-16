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

interface TTSRedemption {
  customRewardId: string
  langauge: TTSLanguage
}

export interface Overlay {
  channel?: string // Used for what chat to connect to for messages / commands / etc.

  ttsRedemptions?: TTSRedemption[]

  currentTopic?: string // Displayed on the overlay

  socials?: { platform: SocialPlatform; handle: string }[] // Displayed in the status bar

  messages?: string[] // Messages to randomly cycle through the status bar
}

export const TTS_LANGUAGES = [
  "american-english",
  "british-english",
  "australian-english",
  "spanish",
  "french",
  "italian",
  "japanese",
] as const
export type TTSLanguage = typeof TTS_LANGUAGES[number]
