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

export interface Overlay {
  id: string
  currentTopic?: string // Displayed on the overlay
  socials?: { platform: SocialPlatform; handle: string }[] // Displayed in the status bar
  messages?: string[] // Messages to randomly cycle through the status bar
  chat?: OverlayChat
  defaultTheme?: Partial<OverlayTheme>
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

export interface StreamStats {
  id: string
  counts?: Count[]
  goals?: Goal[]
}

export interface Count {
  id: string
  value: number
  title?: string
}

export interface Goal {
  id: string
  countId: string
  target: number
  disabled?: boolean
}

export interface StreamBot {
  id: string
  twitchIntegration?: TwitchIntegration
  commands?: ChatCommand[]
}

export interface TwitchIntegration {
  auth?: {
    username: string
    token: string
  }
  channels?: string[]
}

interface ChatCommandBase {
  command: string
  vipOnly?: boolean
}

interface EchoChatCommand extends ChatCommandBase {
  type: "echo"
  message: string
}

interface CountChangeChatCommand extends ChatCommandBase {
  type: "count-change"
  countId: string
  change: number
}

interface CountEchoChatCommand extends ChatCommandBase {
  type: "count-echo"
  countId: string
}

export type ChatCommand =
  | EchoChatCommand
  | CountChangeChatCommand
  | CountEchoChatCommand
