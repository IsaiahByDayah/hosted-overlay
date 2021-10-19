import { useMemo, useEffect } from "react"
import { Client, Events } from "tmi.js"

import { getChatClient } from "lib/twitch"

type WithChatClient<T> = T extends (...args: infer U) => infer R
  ? (chatClient: Client, ...args: U) => R
  : never

export interface UseChatClientProps {
  chatClientParams: Parameters<typeof getChatClient>
  disabled?: boolean
  onMessage?: WithChatClient<Events["message"]>
  onConnected?: WithChatClient<Events["connected"]>
  onDisconnected?: WithChatClient<Events["disconnected"]>
}

const useChatClient = ({
  chatClientParams: [channel, identity],
  disabled,
  onMessage,
  onConnected,
  onDisconnected,
}: UseChatClientProps) => {
  const channelHash = JSON.stringify(channel)

  const chatClient = useMemo(
    () => getChatClient(channel, identity),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [channelHash, identity?.username, identity?.password]
  )

  useEffect(() => {
    if (disabled) return
    chatClient.connect()
    return () => {
      chatClient.disconnect()
    }
  }, [chatClient, disabled])

  useEffect(() => {
    if (onConnected === undefined) return
    const _onConnected: Events["connected"] = (...args) =>
      onConnected(chatClient, ...args)
    chatClient.addListener("connected", _onConnected)
    return () => {
      chatClient.removeListener("connected", _onConnected)
    }
  }, [chatClient, onConnected])

  useEffect(() => {
    if (onMessage === undefined) return
    const _onMessage: Events["message"] = (...args) =>
      onMessage(chatClient, ...args)
    chatClient.addListener("message", _onMessage)
    return () => {
      chatClient.removeListener("message", _onMessage)
    }
  }, [chatClient, onMessage])

  useEffect(() => {
    if (onDisconnected === undefined) return
    const _onDisconnected: Events["disconnected"] = (...args) =>
      onDisconnected(chatClient, ...args)
    chatClient.addListener("disconnected", _onDisconnected)
    return () => {
      chatClient.removeListener("disconnected", _onDisconnected)
    }
  }, [chatClient, onDisconnected])
}

export default useChatClient
