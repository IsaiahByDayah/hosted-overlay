import { useEffect } from "react"

import { validateTwitchIntegration } from "lib/util"

import { useCurrentStreamBot } from "hooks/useStreamBots"

const useValidTwitchToken = () => {
  const [streamBot] = useCurrentStreamBot()

  const twitchToken = streamBot?.twitchIntegration?.auth?.token

  useEffect(() => {
    let interval: number | null = null

    const handleValidation = async () => {
      if (twitchToken) {
        console.log("Validating twitch token: ", twitchToken)
        validateTwitchIntegration({})
      }
    }

    handleValidation()
    window.setInterval(handleValidation, 1000 * 60 * 60)

    return () => {
      if (interval !== null) window.clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [twitchToken])
}

export default useValidTwitchToken
