import { StreamBot } from "lib/types"
import { getFirestoreCollection } from "lib/util"

const useStreamBots = getFirestoreCollection<StreamBot>("streamBots").useHook

export const useCurrentStreamBot =
  getFirestoreCollection<StreamBot>("streamBots").useCurrentHook

export default useStreamBots
