import { useEffect } from "react"
import tmi from "tmi.js"

import { textToSpeech } from "lib/util"
import { getChatClient } from "lib/twitch"

import { useAlerts } from "components/scaffold/AlertsProvider"
import { useOverlayContext } from "components/scaffold/OverlayProvider"

const TwitchAlerts = () => {
  const { enqueueAlert } = useAlerts()
  const { overlay } = useOverlayContext()

  const channel = overlay?.channel
  const overlayTTSRedemptionsHash =
    overlay?.ttsRedemptions?.map((r) => r.customRewardId).join() ?? ""

  useEffect(() => {
    if (!channel) return

    // Create chat client
    const chatClient = getChatClient(channel)

    const onMessage: tmi.Events["message"] = async (
      channel,
      tags,
      message,
      self
    ) => {
      message = message.trim()

      console.log("Twitch Alert || Message: ", channel, tags, message, self)

      const isChannelOwner = `#${tags.username}` === channel

      if (message === "!tts" && isChannelOwner) {
        const tts = await textToSpeech({ text: "Text to speech test" })
        if (tts) {
          enqueueAlert({
            id: tags.id ?? Date.now().toString(),
            hidden: true,
            duration: tts.buffer?.duration,
            onStart: () => {
              tts.start(0)
            },
          })
        }
      }

      if (message === "!tts-now" && isChannelOwner) {
        textToSpeech({
          text: "Immediate text to speech test",
          playImmediately: true,
        })
      }

      if (tags["msg-id"] === "highlighted-message") {
        console.log("Trying to tts: ", message)
        const tts = await textToSpeech({ text: message })
        if (tts) {
          enqueueAlert({
            id: tags.id ?? Date.now().toString(),
            hidden: true,
            duration: tts.buffer?.duration,
            onStart: () => {
              tts.start(0)
            },
          })
        }
      }

      // Check TTS Redemptions
      if (tags["custom-reward-id"]) {
        const customRewardId = tags["custom-reward-id"]

        const foundRedemption = overlay?.ttsRedemptions?.find(
          (r) => r.customRewardId === customRewardId
        )

        if (foundRedemption) {
          const tts = await textToSpeech({
            text: message,
            language: foundRedemption.langauge,
          })
          if (tts) {
            enqueueAlert({
              id: tags.id ?? Date.now().toString(),
              hidden: true,
              duration: tts.buffer?.duration,
              onStart: () => {
                tts.start(0)
              },
            })
          }
        }
      }
    }

    const onCheer: tmi.Events["cheer"] = (channel, tags, message) => {
      console.log("Twitch Alert - Cheer: ", channel, tags, message)
    }

    const onRedeem: tmi.Events["redeem"] = (
      channel,
      username,
      rewardType,
      tags
    ) => {
      console.log(
        "Twitch Alert - Redeem: ",
        channel,
        username,
        rewardType,
        tags
      )

      // enqueueAlert({
      //   id: tags.id ?? Date.now().toString(),
      //   color: tags.color ?? "#006d77",
      //   onStart: () => {
      //     console.log("Starting Reddem Alert: ", rewardType, username)
      //   },
      //   onEnd: () => {
      //     console.log("Stoping Reddem Alert: ", rewardType, username)
      //   },
      // })
    }

    const onSubscription: tmi.Events["subscription"] = (
      channel,
      username,
      rewardType,
      tags
    ) => {
      console.log(
        "Twitch Alert - Subscription: ",
        channel,
        username,
        rewardType,
        tags
      )
    }

    const onResub: tmi.Events["resub"] = (
      channel,
      username,
      months,
      message,
      tags,
      methods
    ) => {
      console.log(
        "Twitch Alert - Subscription: ",
        channel,
        username,
        months,
        message,
        tags,
        methods
      )
    }

    const onRaided: tmi.Events["raided"] = (
      channel: string,
      username: string,
      viewers: number
    ) => {
      console.log("Twitch Alert - Raided: ", channel, username, viewers)
    }

    chatClient.connect()
    chatClient.addListener("message", onMessage)
    chatClient.addListener("cheer", onCheer)
    chatClient.addListener("redeem", onRedeem)
    chatClient.addListener("subscription", onSubscription)
    chatClient.addListener("resub", onResub)
    chatClient.addListener("raided", onRaided)

    return () => {
      chatClient.removeListener("message", onMessage)
      chatClient.removeListener("cheer", onCheer)
      chatClient.removeListener("redeem", onRedeem)
      chatClient.removeListener("subscription", onSubscription)
      chatClient.removeListener("resub", onResub)
      chatClient.removeListener("raided", onRaided)
      chatClient.disconnect()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel, overlayTTSRedemptionsHash])

  return null
}

export default TwitchAlerts
