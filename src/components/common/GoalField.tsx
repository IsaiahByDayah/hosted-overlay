import { useState, useEffect } from "react"
import {
  Stack,
  TextField,
  Button,
  Tooltip,
  Switch,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material"
import {
  DeleteRounded,
  BackspaceRounded,
  SaveRounded,
} from "@mui/icons-material"
import { SxProps, Theme } from "@mui/system"

import { Goal } from "lib/types"

import { useCurrentStreamStats } from "hooks/useStreamStats"

export interface GoalFieldProps {
  sx?: SxProps<Theme> | undefined
  goal: Goal
  onSave: (goal: Goal) => void
  onDelete: (id: string) => void
}

const GoalField = ({ sx, goal, onSave, onDelete }: GoalFieldProps) => {
  const [_goal, setGoal] = useState(goal)
  const [streamStats] = useCurrentStreamStats()

  useEffect(() => setGoal(goal), [goal])

  const valueDifferent =
    goal.countId !== _goal.countId ||
    Boolean(goal.disabled) !== Boolean(_goal.disabled) ||
    goal.target !== _goal.target

  const validCount =
    streamStats?.counts?.find((c) => c.id === _goal.countId) !== undefined

  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={sx}>
      <Tooltip title="Active">
        <Switch
          checked={!Boolean(_goal.disabled)}
          onChange={(e) =>
            setGoal((g) => ({
              ...g,
              disabled: !e.target.checked,
            }))
          }
        />
      </Tooltip>

      <FormControl fullWidth variant="outlined" error={!validCount}>
        <InputLabel id="count-select-label">Count</InputLabel>
        <Select
          labelId="count-select-label"
          label="Count"
          value={Boolean(streamStats?.counts) ? _goal.countId : ""}
          onChange={(e) => {
            setGoal((g) => ({
              ...g,
              countId: e.target.value,
            }))
          }}
        >
          {streamStats?.counts?.map((count) => (
            <MenuItem key={count.id} value={count.id}>
              {count.title ? (
                <>
                  <b>{count.id}</b> - {count.title}
                </>
              ) : (
                <b>{count.id}</b>
              )}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        variant="outlined"
        label="Target"
        value={_goal.target}
        type="number"
        onChange={(e) => {
          var val = parseInt(e.currentTarget.value)
          if (!isNaN(val))
            setGoal((g) => ({
              ...g,
              target: val,
            }))
        }}
        InputLabelProps={{ shrink: true }}
      />

      <Tooltip title="Delete">
        <Button
          variant="outlined"
          color="error"
          onClick={() => onDelete(goal.id)}
        >
          <DeleteRounded />
        </Button>
      </Tooltip>
      <Tooltip title="Clear Changes">
        <span>
          <Button
            variant="outlined"
            disabled={!valueDifferent}
            onClick={() => setGoal(goal)}
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
            onClick={() => onSave(_goal)}
          >
            <SaveRounded />
          </Button>
        </span>
      </Tooltip>
    </Stack>
  )
}

export default GoalField
