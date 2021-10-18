import { SxProps, Theme } from "@mui/system"

import { ChatCommand } from "lib/types"

import EchoChatCommandField from "components/common/EchoChatCommandField"
import CountEchoChatCommandField from "components/common/CountEchoChatCommandField"

export interface ChatCommandFieldProps {
  sx?: SxProps<Theme> | undefined
  chatCommand: ChatCommand
  onSave: (command: ChatCommand) => void
  onDelete: (id: string) => void
}

const ChatCommandField = ({ chatCommand, ...props }: ChatCommandFieldProps) => {
  switch (chatCommand.type) {
    case "echo":
      return <EchoChatCommandField {...props} chatCommand={chatCommand} />
    case "count-echo":
      return <CountEchoChatCommandField {...props} chatCommand={chatCommand} />
    default:
      return null
  }
}

export default ChatCommandField
