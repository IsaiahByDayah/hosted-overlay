import { Button } from "@material-ui/core"
import { Meta, Story } from "@storybook/react"

import { textToSpeech } from "lib/util"

const TTS = () => {
  return (
    <Button
      onClick={() =>
        textToSpeech({ text: "The quick brown fox jumped over the lazy dog." })
      }
    >
      Try TTS
    </Button>
  )
}

export default {
  title: "Experiments/TTS",
  component: TTS,
  parameters: {
    layout: "centered",
  },
} as Meta

export const Basic: Story = (args) => <TTS {...args} />
