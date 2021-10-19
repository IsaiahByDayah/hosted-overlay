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
