import { useState, useEffect } from "react"
import { doc, onSnapshot, setDoc } from "firebase/firestore"

import { Overlay } from "lib/types"
import firebase from "lib/firebase"

import { useAuthContext } from "components/scaffold/AuthProvider"

export interface UseOverlayOptions {
  createIfDoesNotExist?: boolean
}

const useOverlay = (
  userId?: string,
  options?: UseOverlayOptions
): Overlay | undefined | null => {
  const [overlay, setOverlay] = useState<Overlay | undefined | null>(undefined)

  useEffect(() => {
    let unsubscribe: () => void

    if (!userId) {
      // console.log("Tried fetching overlay but no userId...")
      setOverlay(null)
      return
    }

    // console.log("Fetching overlay for userId: ", userId)

    const overlayDocReference = doc(firebase.firestore, `overlays/${userId}`)

    unsubscribe = onSnapshot(overlayDocReference, (snapshot) => {
      if (snapshot.exists()) {
        var data = snapshot.data() as Overlay
        // console.log("Overlay Snapshot: ", data)
        setOverlay(data)
      } else {
        // console.log(`No overlay for userId: ${userId}`)
        if (options?.createIfDoesNotExist) {
          setDoc(overlayDocReference, { id: userId }, { merge: true })
        } else {
          setOverlay(null)
        }
      }
    })

    return () => {
      unsubscribe?.()
    }
  }, [options?.createIfDoesNotExist, userId])

  return overlay
}

export const useCurrentUserOverlay = () => {
  const { user } = useAuthContext()
  return useOverlay(user?.uid, { createIfDoesNotExist: true })
}

export default useOverlay
