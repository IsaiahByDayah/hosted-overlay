import { useMemo, useCallback, useState } from "react"
import { Stack, Typography, Fab } from "@mui/material"
import { PlayArrowRounded, StopRounded } from "@mui/icons-material"
import { updateDoc } from "firebase/firestore"

import { useCurrentStreamBot } from "hooks/useStreamBot"
import { useCurrentStreamStats } from "hooks/useStreamStats"
import useChatClient, { UseChatClientProps } from "hooks/useChatClient"
import { toArray } from "lib/util"

const StreamBotWidget = () => {
  const [streamBot] = useCurrentStreamBot()
  const [streamStats, streamStatsDocRef] = useCurrentStreamStats()
  const [status, setStatus] = useState<"ready" | "running">("ready")
  const [connected, setConnected] = useState(false)

  const canRun = Boolean(streamBot?.twitchIntegration?.auth)

  // Handle connection
  const onConnected = useCallback<
    NonNullable<UseChatClientProps["onConnected"]>
  >(() => {
    console.log("Chat Connected!")
    setConnected(true)
  }, [])

  // Handle disconnection
  const onDisconnected = useCallback<
    NonNullable<UseChatClientProps["onDisconnected"]>
  >(() => {
    console.log("Chat Disconnected!")
    setConnected(false)
  }, [])

  // Handle new messages
  const onMessage = useCallback<NonNullable<UseChatClientProps["onMessage"]>>(
    (chatClient, channel, tags, message, self) => {
      console.log(
        `Stream Bot || ${tags["display-name"]}: ${message}`,
        channel,
        tags,
        self
      )

      // Light message sanitization/formatting
      message = message.trim()

      // Trigger potential chat commands
      streamBot?.commands
        ?.filter((chatCommand) => !chatCommand.disabled)
        .forEach((chatCommand) => {
          if (message === chatCommand.command) {
            const failsVipCheck =
              Boolean(chatCommand.vipOnly) &&
              !(
                Boolean(tags.badges?.vip) ||
                tags.mod ||
                `#${tags.username}` === channel
              )

            if (failsVipCheck) {
              console.log("Non-VIP tried status vip-only chat command...")
              return
            }

            console.log("Handling chat command: ", chatCommand)
            switch (chatCommand.type) {
              case "echo": {
                console.log("Processing chat command: ", chatCommand)
                chatClient.say(channel, chatCommand.message)
                break
              }

              case "count-echo": {
                const count = streamStats?.counts?.find(
                  (c) => c.id === chatCommand.countId
                )
                if (count === undefined) {
                  console.log(
                    "Could not find related count for chat command..."
                  )
                  break
                }

                console.log("Processing chat command: ", chatCommand)
                chatClient.say(
                  channel,
                  chatCommand.template
                    ? chatCommand.template.replaceAll(
                        "{{value}}",
                        `${count.value}`
                      )
                    : count.title
                    ? `Current ${count.title} count: ${count.value}`
                    : `Current count: ${count.value}`
                )
                break
              }

              case "count-change": {
                const count = streamStats?.counts?.find(
                  (c) => c.id === chatCommand.countId
                )
                if (count === undefined) {
                  console.log(
                    "Could not find related count for chat command..."
                  )
                  break
                }

                console.log("Processing chat command: ", chatCommand)
                updateDoc(streamStatsDocRef, {
                  counts: (streamStats?.counts ?? []).map((c) => {
                    if (c.id === chatCommand.countId) {
                      return {
                        ...c,
                        value: c.value + chatCommand.change,
                      }
                    }
                    return c
                  }),
                }).then(() => {
                  chatClient.say(
                    channel,
                    `Current count: ${count.value + chatCommand.change}`
                  )
                })
                break
              }
              default:
                console.log("Unhandled Chat Command: ", chatCommand)
                break
            }
          }
        })
    },
    [streamBot, streamStats, streamStatsDocRef]
  )

  const channelsHash = streamBot?.twitchIntegration?.channels
    ? toArray(streamBot?.twitchIntegration?.channels).join()
    : undefined
  const channel = useMemo<string[]>(
    () => streamBot?.twitchIntegration?.channels ?? [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [channelsHash]
  )
  const identity = useMemo<UseChatClientProps["chatClientParams"][1]>(
    () =>
      streamBot?.twitchIntegration?.auth
        ? {
            username: streamBot.twitchIntegration.auth.username,
            password: streamBot.twitchIntegration.auth.token,
          }
        : undefined,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      streamBot?.twitchIntegration?.auth?.token,
      streamBot?.twitchIntegration?.auth?.username,
    ]
  )
  const chatClientParams = useMemo<UseChatClientProps["chatClientParams"]>(
    () => [channel, identity],
    [channel, identity]
  )

  useChatClient({
    chatClientParams,
    disabled: status !== "running",
    onMessage,
    onConnected,
    onDisconnected,
  })

  const getTitle = () => {
    if (!streamBot) return "Loading..."
    if (!Boolean(streamBot?.twitchIntegration?.auth))
      return "Twitch connection required"
    switch (status) {
      case "ready":
        return "Ready to start"
      case "running":
        return connected ? "Running..." : "Connecting..."
    }
  }

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Fab
        disabled={!canRun}
        size="small"
        onClick={() =>
          setStatus((s) => {
            if (s === "running") {
              console.log("Stopping Bot!")
              return "ready"
            } else {
              console.log("Starting Bot...")
              return "running"
            }
          })
        }
      >
        {status === "running" ? <StopRounded /> : <PlayArrowRounded />}
      </Fab>
      <Typography fontWeight="bold">{getTitle()}</Typography>
    </Stack>
  )
}

export default StreamBotWidget
