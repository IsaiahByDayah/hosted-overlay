import { Meta, Story } from "@storybook/react"

import CurrentTopic, {
  CurrentTopicProps,
} from "components/widgets/CurrentTopic"

export default {
  title: "Widgets/CurrentTopic",
  component: CurrentTopic,
  parameters: {
    layout: "centered",
  },
} as Meta

export const Basic: Story<CurrentTopicProps> = (args) => (
  <CurrentTopic {...args} />
)
