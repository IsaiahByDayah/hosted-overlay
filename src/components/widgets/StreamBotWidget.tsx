import { useState, useEffect } from "react"
import { Stack, Typography, Fab } from "@mui/material"
import { PlayArrowRounded, StopRounded } from "@mui/icons-material"
import { Events } from "tmi.js"
import { updateDoc } from "firebase/firestore"

import { getChatClient } from "lib/twitch"

import { useCurrentStreamBot } from "hooks/useStreamBot"
import { useCurrentStreamStats } from "hooks/useStreamStats"

const StreamBotWidget = () => {
  const [streamBot] = useCurrentStreamBot()
  const [streamStats, streamStatsDocRef] = useCurrentStreamStats()
  const [status, setStatus] = useState<"ready" | "running">("ready")
  const [connected, setConnected] = useState(false)

  const canRun = Boolean(streamBot?.twitchIntegration?.auth)

  useEffect(() => {
    let running = true

    if (!canRun) return
    if (status !== "running") return

    const channels = streamBot?.twitchIntegration?.channels!
    const auth = streamBot?.twitchIntegration?.auth!

    const chatClient = getChatClient(channels, {
      username: auth.username,
      password: auth.token,
    })

    // Handle new messages
    const onMessage: Events["message"] = (channel, tags, message, self) => {
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
                  if (running) {
                    chatClient.say(
                      channel,
                      `Current count: ${count.value + chatCommand.change}`
                    )
                  }
                })
                break
              }
              default:
                console.log("Unhandled Chat Command: ", chatCommand)
                break
            }
          }
        })
    }

    const onConnected = () => setConnected(true)
    const onDisconnected = () => setConnected(false)

    chatClient.addListener("message", onMessage)
    chatClient.addListener("connected", onConnected)
    chatClient.addListener("disconnected", onDisconnected)
    chatClient.connect()

    return () => {
      running = false
      chatClient.disconnect()
      // chatClient.removeListener("message", onMessage)
      // chatClient.addListener("connected", onConnected)
      // chatClient.addListener("disconnected", onDisconnected)
      setConnected(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamBot, streamStats, status])

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
