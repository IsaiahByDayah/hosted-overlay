import { useState, useEffect, MouseEvent } from "react"
import { ButtonBase, Popover, Tooltip } from "@mui/material"
import { SxProps, Theme } from "@mui/system"
import { ChromePicker } from "react-color"

import { copyToClipboard } from "lib/util"

export interface ColorPickerProps {
  sx?: SxProps<Theme> | undefined
  color: string
  onChange?: ((color: string) => void) | null
}

const ColorPicker = ({ sx, color, onChange }: ColorPickerProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [localColor, setLocalColor] = useState<string>(color)

  useEffect(() => setLocalColor(color), [color])

  const onClose = () => {
    setAnchorEl(null)
  }

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (Boolean(onChange)) {
      setAnchorEl(e.currentTarget)
    } else {
      copyToClipboard(color)
    }
  }

  const onMouseEnter = (e: MouseEvent<HTMLButtonElement>) => {
    if (!Boolean(onChange)) {
      setAnchorEl(e.currentTarget)
    }
  }

  const onMouseLeave = (e: MouseEvent<HTMLButtonElement>) => {
    if (!Boolean(onChange)) {
      onClose()
    }
  }

  const open = Boolean(anchorEl)

  let button = (
    <ButtonBase
      sx={{
        p: 0,
        borderRadius: 1,
        boxShadow: ({ shadows }) => shadows[1],
        height: ({ spacing }) => spacing(3),
        width: ({ spacing }) => spacing(3),
        backgroundColor: color,
        "&:hover": {
          backgroundColor: color,
        },
        ...sx,
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  )

  if (!Boolean(onChange)) {
    button = (
      <Tooltip title={color} arrow placement="top">
        {button}
      </Tooltip>
    )
  }

  return (
    <>
      {button}
      {Boolean(onChange) && (
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={onClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <ChromePicker
            color={localColor}
            onChange={(colorResult) => setLocalColor(colorResult.hex)}
            onChangeComplete={(colorResult) => onChange?.(colorResult.hex)}
          />
        </Popover>
      )}
    </>
  )
}

export default ColorPicker
