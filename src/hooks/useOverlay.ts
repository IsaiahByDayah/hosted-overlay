import { Overlay } from "lib/types"
import { getFirestoreCollection } from "lib/util"

const useOverlay = getFirestoreCollection<Overlay>("overlays").useHook

export const useCurrentOverlay =
  getFirestoreCollection<Overlay>("overlays").useCurrentHook

export default useOverlay
