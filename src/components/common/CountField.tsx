import { useState, useEffect } from "react"
import { Stack, TextField, Typography, Button, Tooltip } from "@mui/material"
import {
  DeleteRounded,
  BackspaceRounded,
  SaveRounded,
} from "@mui/icons-material"
import { SxProps, Theme } from "@mui/system"

import { Count } from "lib/types"

export interface CountFieldProps {
  sx?: SxProps<Theme> | undefined
  count: Count
  onSave: (count: Count) => void
  onDelete: (id: string) => void
}

const CountField = ({ sx, count, onSave, onDelete }: CountFieldProps) => {
  const [_count, setCount] = useState(count)

  useEffect(() => setCount(count), [count])

  const valueDifferent =
    count.value !== _count.value || count.title !== _count.title

  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={sx}>
      <Typography
        sx={{
          fontSize: "body1",
          fontWeight: "bold",
        }}
      >
        {_count.id}
      </Typography>

      <TextField
        variant="outlined"
        label="Value"
        value={_count.value}
        type="number"
        onChange={(e) => {
          var val = parseInt(e.currentTarget.value)
          if (!isNaN(val))
            setCount((c) => ({
              ...c,
              value: val,
            }))
        }}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        fullWidth
        variant="outlined"
        label="Title"
        placeholder="Win streak"
        value={_count.title}
        onChange={(e) =>
          setCount((c) => ({
            ...c,
            title: e.target.value,
          }))
        }
        InputLabelProps={{ shrink: true }}
      />

      <Tooltip title="Delete">
        <Button
          variant="outlined"
          color="error"
          onClick={() => onDelete(count.id)}
        >
          <DeleteRounded />
        </Button>
      </Tooltip>
      <Tooltip title="Clear Changes">
        <span>
          <Button
            variant="outlined"
            disabled={!valueDifferent}
            onClick={() => setCount(count)}
          >
            <BackspaceRounded />
          </Button>
        </span>
      </Tooltip>
      <Tooltip title="Save">
        <span>
          <Button
            variant="contained"
            disabled={!valueDifferent}
            onClick={() => onSave(_count)}
          >
            <SaveRounded />
          </Button>
        </span>
      </Tooltip>
    </Stack>
  )
}

export default CountField
