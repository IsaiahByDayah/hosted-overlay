import { useEffect, useMemo } from "react"
import { updateDoc, deleteField } from "firebase/firestore"

import { validateToken } from "lib/twitch"

import { useCurrentStreamBot } from "hooks/useStreamBots"

import AdminSection from "components/admin/AdminSection"

import ConnectTwitchButton from "components/common/ConnectTwitchButton"

const StreamBot = () => {
  const [streamBot, streamBotDocRef] = useCurrentStreamBot()

  const twitchToken = streamBot?.twitchIntegration?.auth?.token

  useEffect(() => {
    let interval: number | null = null

    const handleValidation = async () => {
      if (twitchToken) {
        try {
          const validToken = await validateToken(twitchToken)
          if (validToken) return
        } catch (e) {
          console.log("Error Validating Token... ", e)
        }

        // Remove current twitch creds
        updateDoc(streamBotDocRef, {
          "twitchIntegration.auth": deleteField(),
        })
      }
    }

    handleValidation()
    window.setInterval(handleValidation, 1000 * 60 * 60)

    return () => {
      if (interval !== null) window.clearInterval(interval)
    }
  }, [twitchToken])

  return (
    <AdminSection
      title="Stream Bot"
      extra={<ConnectTwitchButton />}
    ></AdminSection>
  )
}

export default StreamBot
