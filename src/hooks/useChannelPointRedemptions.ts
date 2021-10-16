import { ChannelPointRedemptions } from "lib/types"
import { getFirestoreCollection } from "lib/util"

const useChannelPointRedemptions =
  getFirestoreCollection<ChannelPointRedemptions>(
    "channelPointRedemptions"
  ).useHook

export const useCurrentChannelPointRedemptions =
  getFirestoreCollection<ChannelPointRedemptions>(
    "channelPointRedemptions"
  ).useCurrentHook

export default useChannelPointRedemptions
