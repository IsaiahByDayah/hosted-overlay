import { Meta, Story } from "@storybook/react"

import SocialProfile, {
  SocialProfileProps,
} from "components/common/SocialProfile"

export default {
  title: "Common/SocialProfile",
  component: SocialProfile,
  parameters: {
    layout: "centered",
  },
} as Meta

export const Basic: Story<SocialProfileProps> = (args) => (
  <SocialProfile {...args} />
)
Basic.args = {
  label: "IsaiahByDayah",
}
Basic.argTypes = {}
