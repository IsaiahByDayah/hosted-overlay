import { Stack, Divider } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { updateDoc } from "firebase/firestore"

import {
  ChatCommand,
  EchoChatCommand,
  CountEchoChatCommand,
  CountChangeChatCommand,
} from "lib/types"
import { uid } from "lib/util"

import { useCurrentStreamBot } from "hooks/useStreamBot"

import AdminField from "components/admin/AdminField"
import ChatCommandField from "components/common/ChatCommandField"

const ChatCommands = () => {
  const [streamBot, streamBotDocRef] = useCurrentStreamBot()

  const createEchoChatCommand = async () => {
    const command: EchoChatCommand = {
      id: uid(),
      command: "",
      type: "echo",
      message: "",
    }

    await updateDoc(streamBotDocRef, {
      commands: [command, ...(streamBot?.commands ?? [])],
    })
  }

  const createCountEchoChatCommand = async () => {
    const command: CountEchoChatCommand = {
      id: uid(),
      command: "",
      type: "count-echo",
      countId: "",
    }

    await updateDoc(streamBotDocRef, {
      commands: [command, ...(streamBot?.commands ?? [])],
    })
  }

  const createCountChangeChatCommand = async () => {
    const command: CountChangeChatCommand = {
      id: uid(),
      command: "",
      type: "count-change",
      countId: "",
      change: 0,
    }

    await updateDoc(streamBotDocRef, {
      commands: [command, ...(streamBot?.commands ?? [])],
    })
  }

  const onSave = async (chatCommand: ChatCommand) => {
    const chatCommands = (streamBot?.commands ?? []).map((c) => {
      if (c.id === chatCommand.id) {
        return chatCommand
      }
      return c
    })
    await updateDoc(streamBotDocRef, {
      commands: chatCommands,
    })
  }

  const onDelete = async (id: string) => {
    await updateDoc(streamBotDocRef, {
      commands: (streamBot?.commands ?? []).filter((c) => !(c.id === id)),
    })
  }

  return (
    <AdminField
      title="Chat Commands"
      description="Create and manage chat commands"
    >
      <Stack spacing={2} divider={<Divider />}>
        <Stack direction="row" alignItems="baseline" spacing={2}>
          <LoadingButton
            variant="contained"
            loading={!streamBot}
            onClick={() => createEchoChatCommand()}
          >
            Create Echo Command
          </LoadingButton>
          <LoadingButton
            variant="contained"
            loading={!streamBot}
            onClick={() => createCountEchoChatCommand()}
          >
            Create Count Echo Command
          </LoadingButton>
          <LoadingButton
            variant="contained"
            loading={!streamBot}
            onClick={() => createCountChangeChatCommand()}
          >
            Create Count Change Command
          </LoadingButton>
        </Stack>

        {streamBot?.commands?.map((chatCommand) => (
          <ChatCommandField
            key={chatCommand.id}
            onSave={onSave}
            onDelete={onDelete}
            chatCommand={chatCommand}
          />
        ))}
      </Stack>
    </AdminField>
  )
}

export default ChatCommands
