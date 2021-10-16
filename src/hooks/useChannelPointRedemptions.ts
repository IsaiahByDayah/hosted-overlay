import { useState, useEffect } from "react"
import { doc, onSnapshot, setDoc } from "firebase/firestore"

import { ChannelPointRedemptions } from "lib/types"
import firebase from "lib/firebase"

import { useAuthContext } from "components/scaffold/AuthProvider"

export interface UseChannelPointRedemptionsOptions {
  createIfDoesNotExist?: boolean
}

const useChannelPointRedemptions = (
  userId?: string,
  options?: UseChannelPointRedemptionsOptions
): ChannelPointRedemptions | undefined | null => {
  const [channelPointRedemptions, setChannelPointRedemptions] = useState<
    ChannelPointRedemptions | undefined | null
  >(undefined)

  useEffect(() => {
    let unsubscribe: () => void

    if (!userId) {
      // console.log("Tried fetching channel point redemptions but no userId...")
      setChannelPointRedemptions(null)
      return
    }

    // console.log("Fetching channel point redemptions for userId: ", userId)

    const channelPointRedemptionsDocReference = doc(
      firebase.firestore,
      `channelPointRedemptions/${userId}`
    )

    unsubscribe = onSnapshot(
      channelPointRedemptionsDocReference,
      (snapshot) => {
        if (snapshot.exists()) {
          var data = snapshot.data() as ChannelPointRedemptions
          // console.log("Channel Point Redemptions Snapshot: ", data)
          setChannelPointRedemptions(data)
        } else {
          // console.log(`No overlay for userId: ${userId}`)
          if (options?.createIfDoesNotExist) {
            setDoc(
              channelPointRedemptionsDocReference,
              { id: userId },
              { merge: true }
            )
          } else {
            setChannelPointRedemptions(null)
          }
        }
      }
    )

    return () => {
      unsubscribe?.()
    }
  }, [options?.createIfDoesNotExist, userId])

  return channelPointRedemptions
}

export const useCurrentChannelPointRedemptions = () => {
  const { user } = useAuthContext()
  return useChannelPointRedemptions(user?.uid, { createIfDoesNotExist: true })
}

export default useChannelPointRedemptions
