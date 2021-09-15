import { useEffect } from "react"
import tmi from "tmi.js"

import { textToSpeech } from "lib/util"
import { getChatClient } from "lib/twitch"

import { useAlerts } from "components/scaffold/AlertsProvider"
import { useOverlayContext } from "components/scaffold/OverlayProvider"

const TwitchAlerts = () => {
  const { enqueueAlert } = useAlerts()
  const { overlay } = useOverlayContext()

  useEffect(() => {
    if (!overlay?.channel) return

    // Create chat client
    const chatClient = getChatClient(overlay.channel)

    const onMessage: tmi.Events["message"] = async (
      channel,
      tags,
      message,
      self
    ) => {
      console.log("Twitch Alert - Message: ", channel, tags, message, self)

      if (tags["msg-id"] === "highlighted-message") {
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
    chatClient.addListener("raided", onRaided)

    return () => {
      chatClient.removeListener("message", onMessage)
      chatClient.removeListener("cheer", onCheer)
      chatClient.removeListener("redeem", onRedeem)
      chatClient.removeListener("subscription", onSubscription)
      chatClient.removeListener("raided", onRaided)
      chatClient.disconnect()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export default TwitchAlerts
