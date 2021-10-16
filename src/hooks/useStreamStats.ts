import { StreamStats } from "lib/types"
import { getFirestoreCollection } from "lib/util"

const useStreamStats =
  getFirestoreCollection<StreamStats>("streamStats").useHook

export const useCurrentStreamStats =
  getFirestoreCollection<StreamStats>("streamStats").useCurrentHook

export default useStreamStats
