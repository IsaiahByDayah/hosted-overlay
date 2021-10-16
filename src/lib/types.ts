export type AspectRatio = string | number | (() => string | number)

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

export interface OverlayTheme {
  mode: "light" | "dark"
  mainSection: string
  sidebar: string
  statusBar: string
  card: string
  progressBackground: string
  progressFill: string
  chromaKey: string
}

export interface OverlayCount {
  key: string
  value: number
}

export interface Overlay {
  id: string
  currentTopic?: string // Displayed on the overlay
  socials?: { platform: SocialPlatform; handle: string }[] // Displayed in the status bar
  messages?: string[] // Messages to randomly cycle through the status bar
  chat?: OverlayChat
  defaultTheme?: Partial<OverlayTheme>
  counts?: OverlayCount[]
}

export interface OverlayChat {
  channel?: string // Used for what chat to display in overlay
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

interface TTSRedemption {
  customRewardId: string
  langauge: TTSLanguage
}

export interface ChannelPointRedemptions {
  id: string
  ttsRedemptions?: TTSRedemption[]
}

interface ChatCommandBase {
  command: string
}

interface EchoChatCommand extends ChatCommandBase {
  type: "echo"
  message: string
}

interface CountChatCommand extends ChatCommandBase {
  type: "count"
  key: string
  change: number
}

export type ChatCommand = EchoChatCommand | CountChatCommand

export interface TwitchBot {
  auth?: {
    username: string
    token: string
  }
  channels?: string[]
  commands?: ChatCommand[]
}
