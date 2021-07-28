import { Button } from "@material-ui/core"
import { Meta, Story } from "@storybook/react"

import { createCallable } from "lib/util"

const ttsCallable = createCallable<void, string>("tts")

const TTS = () => {
  const playAudio = (data: string) => {
    const mp3 = new Blob([data], { type: "audio/mp3" })
    const url = window.URL.createObjectURL(mp3)
    const audio = new Audio(url)
    audio.load()
    audio.play()
  }

  const fetchAndPlay = async () => {
    const data = await ttsCallable()

    console.log("Data: ", data)

    playAudio(data)
  }

  return <Button onClick={() => fetchAndPlay()}>Try TTS</Button>
}

export default {
  title: "Experiments/TTS",
  component: TTS,
  parameters: {
    layout: "centered",
  },
} as Meta

export const Basic: Story = (args) => <TTS {...args} />
