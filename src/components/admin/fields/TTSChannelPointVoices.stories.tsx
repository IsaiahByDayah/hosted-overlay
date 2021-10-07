import { Meta, Story } from "@storybook/react"

import TTSChannelPointVoices from "components/admin/fields/TTSChannelPointVoices"

export default {
  title: "Admin/Fields/TTS Channel Point Voices",
  component: TTSChannelPointVoices,
} as Meta

export const Basic: Story = (args) => <TTSChannelPointVoices {...args} />
