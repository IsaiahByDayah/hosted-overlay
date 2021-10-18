import { useState, useMemo, useEffect } from "react"
import { useLocation, useHistory } from "react-router-dom"
import { Stack, Typography, Container } from "@mui/material"

import { validateTwitchIntegration } from "lib/util"

import { useCurrentStreamBot } from "hooks/useStreamBots"

import Header from "components/common/Header"

const TwitchIntegration = () => {
  const [status, setStatus] = useState<"running" | "error" | "complete">(
    "running"
  )
  const location = useLocation()
  const history = useHistory()
  const [streamBot] = useCurrentStreamBot()

  const access_token = useMemo(() => {
    const hashSections = location.hash.split("&")
    for (const hashSection of hashSections) {
      const parts = hashSection.split("=")
      if (parts[0]?.indexOf("access_token") >= 0) return parts[1]
    }
    return undefined
  }, [location.hash])

  useEffect(() => {
    let running = true

    if (access_token) {
      if (Boolean(streamBot)) {
        validateTwitchIntegration({ token: access_token })
          .then((res) => {
            if (running) {
              if (res === null) {
                console.log("Couldn't validate twitch integration...")
                setStatus("error")
              } else {
                setStatus("complete")
                window.setTimeout(() => {
                  if (running) history.push("/admin")
                }, 1000 * 5)
              }
            }
          })
          .catch((e) => {
            console.log("Couldn't validate twitch integration...", e)
            setStatus("error")
          })
      }
    } else {
      console.log("Missing Access Token...")
      setStatus("error")
    }

    return () => {
      running = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access_token, Boolean(streamBot)])

  return (
    <div>
      <Header />
      <Container component={Stack} spacing={5} sx={{ py: 5 }}>
        <Typography fontWeight="bold" variant="h5" textAlign="center">
          Twitch Integration
        </Typography>

        {status === "running" && (
          <Typography textAlign="center">
            Connecting your twitch account, please wait...
          </Typography>
        )}
        {status === "error" && (
          <Typography color="error" textAlign="center">
            Something went wrong. Please try again.
          </Typography>
        )}
        {status === "complete" && (
          <Typography textAlign="center">
            Twitch connected! Redirecting to admin panel...
          </Typography>
        )}
      </Container>
    </div>
  )
}

export default TwitchIntegration
