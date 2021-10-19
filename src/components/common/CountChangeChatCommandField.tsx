import { useState, useEffect } from "react"
import {
  Stack,
  TextField,
  Switch,
  Button,
  Tooltip,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import {
  DeleteRounded,
  BackspaceRounded,
  SaveRounded,
} from "@mui/icons-material"

import { CountChangeChatCommand } from "lib/types"

import { useCurrentStreamStats } from "hooks/useStreamStats"

import { ChatCommandFieldProps } from "components/common/ChatCommandField"

export interface CountChangeChatCommandFieldProps
  extends ChatCommandFieldProps {
  chatCommand: CountChangeChatCommand
}

const CountChangeChatCommandField = ({
  sx,
  chatCommand,
  onSave,
  onDelete,
}: CountChangeChatCommandFieldProps) => {
  const [_chatCommand, setChatCommand] = useState(chatCommand)
  const [streamStats] = useCurrentStreamStats()

  useEffect(() => setChatCommand(chatCommand), [chatCommand])

  const count = streamStats?.counts?.find((c) => c.id === _chatCommand.countId)

  const validCommand = _chatCommand.command.length >= 1
  const validCount = count !== undefined

  const chatCommandDifferent =
    chatCommand.command !== _chatCommand.command ||
    chatCommand.countId !== _chatCommand.countId ||
    chatCommand.change !== _chatCommand.change ||
    Boolean(chatCommand.disabled) !== Boolean(_chatCommand.disabled) ||
    Boolean(chatCommand.vipOnly) !== Boolean(_chatCommand.vipOnly)

  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={sx}>
      <Tooltip title="Active">
        <Switch
          checked={!Boolean(_chatCommand.disabled)}
          onChange={(e) =>
            setChatCommand((c) => ({
              ...c,
              disabled: !e.target.checked,
            }))
          }
        />
      </Tooltip>

      <Stack
        sx={{ flexGrow: 1 }}
        direction="row"
        alignItems="center"
        spacing={2}
      >
        <TextField
          variant="outlined"
          label="Command"
          placeholder="!schedule"
          error={!validCommand}
          value={_chatCommand.command}
          onChange={(e) =>
            setChatCommand((c) => ({
              ...c,
              command: e.target.value,
            }))
          }
          InputLabelProps={{ shrink: true }}
        />

        <FormControl fullWidth variant="outlined" error={!validCount}>
          <InputLabel id="count-select-label">Count</InputLabel>
          <Select
            labelId="count-select-label"
            label="Count"
            value={Boolean(streamStats?.counts) ? _chatCommand.countId : ""}
            onChange={(e) => {
              setChatCommand((c) => ({
                ...c,
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
          label="Change Amount"
          error={_chatCommand.change === 0}
          value={_chatCommand.change}
          type="number"
          onChange={(e) => {
            const val = parseInt(e.currentTarget.value)
            if (!isNaN(val))
              setChatCommand((c) => ({
                ...c,
                change: val,
              }))
          }}
          InputLabelProps={{ shrink: true }}
        />

        <FormControlLabel
          sx={{ flexShrink: 0 }}
          control={
            <Checkbox
              checked={Boolean(_chatCommand.vipOnly)}
              onChange={(e) =>
                setChatCommand((c) => ({
                  ...c,
                  vipOnly: e.target.checked,
                }))
              }
            />
          }
          label="VIP Only"
          labelPlacement="start"
        />
      </Stack>

      <Tooltip title="Delete">
        <Button
          variant="outlined"
          color="error"
          onClick={() => onDelete(chatCommand.id)}
        >
          <DeleteRounded />
        </Button>
      </Tooltip>
      <Tooltip title="Clear Changes">
        <span>
          <Button
            variant="outlined"
            disabled={!chatCommandDifferent}
            onClick={() => setChatCommand(chatCommand)}
          >
            <BackspaceRounded />
          </Button>
        </span>
      </Tooltip>
      <Tooltip title="Save">
        <span>
          <Button
            variant="contained"
            disabled={!chatCommandDifferent}
            onClick={() => onSave(_chatCommand)}
          >
            <SaveRounded />
          </Button>
        </span>
      </Tooltip>
    </Stack>
  )
}

export default CountChangeChatCommandField
