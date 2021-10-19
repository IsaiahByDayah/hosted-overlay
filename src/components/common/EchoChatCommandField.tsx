import { useState, useEffect } from "react"
import {
  Stack,
  TextField,
  Switch,
  Button,
  Tooltip,
  Checkbox,
  FormControlLabel,
} from "@mui/material"
import {
  DeleteRounded,
  BackspaceRounded,
  SaveRounded,
} from "@mui/icons-material"

import { EchoChatCommand } from "lib/types"

import { ChatCommandFieldProps } from "components/common/ChatCommandField"

export interface EchoChatCommandFieldProps extends ChatCommandFieldProps {
  chatCommand: EchoChatCommand
}

const EchoChatCommandField = ({
  sx,
  chatCommand,
  onSave,
  onDelete,
}: EchoChatCommandFieldProps) => {
  const [_chatCommand, setChatCommand] = useState(chatCommand)

  useEffect(() => setChatCommand(chatCommand), [chatCommand])

  const validCommand = _chatCommand.command.length >= 1
  const validMessage = _chatCommand.message.length >= 1

  const chatCommandDifferent =
    chatCommand.command !== _chatCommand.command ||
    chatCommand.message !== _chatCommand.message ||
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

      <Stack sx={{ flexGrow: 1 }} spacing={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
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
        <TextField
          fullWidth
          multiline
          variant="outlined"
          label="Message"
          placeholder="I stream every Monday and Wednesday from..."
          error={!validMessage}
          value={_chatCommand.message}
          onChange={(e) =>
            setChatCommand((c) => ({
              ...c,
              message: e.target.value,
            }))
          }
          InputLabelProps={{ shrink: true }}
        />
      </Stack>
    </Stack>
  )
}

export default EchoChatCommandField
