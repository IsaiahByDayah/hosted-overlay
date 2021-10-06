import { useState, useEffect } from "react"
import { doc, onSnapshot } from "firebase/firestore"

import { Overlay } from "lib/types"
import firebase from "lib/firebase"

import { useAuthContext } from "components/scaffold/AuthProvider"

const useOverlay = (userId?: string): Overlay | undefined | null => {
  const [overlay, setOverlay] = useState<Overlay | undefined | null>(undefined)

  useEffect(() => {
    let unsubscribe: () => void

    if (!userId) {
      console.log("Tried fetching overlay but no userId...")
      setOverlay(null)
      return
    }

    console.log("Fetching overlay for userId: ", userId)

    const overlayDocReference = doc(firebase.firestore, `overlays/${userId}`)
    // .withConverter<Overlay>({
    //   toFirestore: (overlay) => overlay,
    //   fromFirestore: (snapshot) => snapshot.data() as Overlay,
    // })

    unsubscribe = onSnapshot(overlayDocReference, (snapshot) => {
      if (snapshot.exists()) {
        var data = snapshot.data() as Overlay
        console.log("Overlay Snapshot: ", data)
        setOverlay(data)
      } else {
        console.log(`No overlay for userId: ${userId}`)
        setOverlay(null)
      }
    })

    return () => {
      unsubscribe?.()
    }
  }, [userId])

  return overlay
}

export const useCurrentUserOverlay = () => {
  const { user } = useAuthContext()
  return useOverlay(user?.uid)
}

export default useOverlay
