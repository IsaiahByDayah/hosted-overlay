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