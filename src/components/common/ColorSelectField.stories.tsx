import { Meta, Story } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import ColorSelectField, {
  ColorSelectFieldProps,
} from "components/common/ColorSelectField"

export default {
  title: "Common/Color Select Field",
  component: ColorSelectField,
  parameters: {
    layout: "centered",
  },
} as Meta

const DEFAULT_COLOR = "#FF8811"

const Template: Story<ColorSelectFieldProps> = (args) => (
  <ColorSelectField {...args} />
)

export const PickerMode = Template.bind({})
PickerMode.args = {
  color: DEFAULT_COLOR,
  onChange: action("onChange!"),
  title: "Some Title",
  description: "Cumque incidunt dolor nemo quia blanditiis accusamus odio",
}
PickerMode.argTypes = {
  color: {
    control: {
      type: "color",
    },
  },
}

export const CopyMode = Template.bind({})
CopyMode.args = {
  color: DEFAULT_COLOR,
  onChange: null,
  title: "Some Title",
  description: "Cumque incidunt dolor nemo quia blanditiis accusamus odio",
}
CopyMode.argTypes = {
  color: {
    control: {
      type: "color",
    },
  },
}
