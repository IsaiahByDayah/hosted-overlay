import { Stack, Typography, Button } from "@mui/material"

import ColorPicker, { ColorPickerProps } from "components/common/ColorPicker"

export interface ColorSelectFieldProps extends ColorPickerProps {
  title: string
  description?: string
}

const ColorSelectField = ({
  color,
  title,
  onChange,
  description,
  sx,
}: ColorSelectFieldProps) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={sx}>
      <ColorPicker color={color} onChange={onChange} />
      {onChange && (
        <Button
          variant="outlined"
          size="small"
          disabled={!Boolean(color)}
          onClick={() => onChange?.("")}
        >
          Clear
        </Button>
      )}
      <Typography>
        <b>{title}</b>
        {Boolean(description) && ` - ${description}`}
      </Typography>
    </Stack>
  )
}

export default ColorSelectField
