import { Meta, Story } from "@storybook/react"

import ColorPicker, { ColorPickerProps } from "components/common/ColorPicker"

export default {
  title: "Common/ColorPicker",
  component: ColorPicker,
  parameters: {
    layout: "centered",
  },
} as Meta

const DEFAULT_COLOR: string = "#FF8811"

const Template: Story<ColorPickerProps> = (args) => <ColorPicker {...args} />

export const PickerMode = Template.bind({})
PickerMode.args = {
  color: DEFAULT_COLOR,
  onChange: (color) => console.log("Selected Color: ", color),
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
}
CopyMode.argTypes = {
  color: {
    control: {
      type: "color",
    },
  },
}
