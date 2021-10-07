import { useState, useEffect } from "react"
import { Box, Typography, Stack, styled } from "@mui/material"
import { keyframes } from "@mui/styled-engine"
import { SxProps, Theme } from "@mui/system"

import constants from "lib/constants"

import { useOverlayContext } from "components/scaffold/OverlayProvider"

import SocialProfile from "components/common/SocialProfile"

const fadeInAnimation = keyframes`
  0% { opacity: 0 }
  100% { opacity: 1 }
`
const marqueeAnimation = keyframes`
  0% { transform: translate(100%, 0) };
  100% { transform: translate(-100%, 0) };
`

const StyledSocialsStack = styled(Stack)(({ theme }) => ({
  opacity: 0,
  animation: `${fadeInAnimation} ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeIn} 2s forwards`,
}))

const StyledMessageTypography = styled(Typography)({
  whiteSpace: "nowrap",
  transform: "translate(100%, 0)",
  animation: `${marqueeAnimation} 30s linear 2s infinite`,
})

export interface StatusBarProps {
  sx?: SxProps<Theme> | undefined
}

const MAX_INDEX = 1

const getWaitTimeSeconds = (index: number) => {
  if (constants.IS_EMULATOR) return 10

  switch (index) {
    case 0:
      return (2 + Math.random() * 3) * 60
    case 1:
      return 60
    default:
      return 60
  }
}

const StatusBar = ({ sx }: StatusBarProps) => {
  const [index, setIndex] = useState(0)
  const { overlay } = useOverlayContext()
  const [message, setMessage] = useState<string | undefined>(undefined)

  const messagesHash = overlay?.messages?.join() ?? ""

  useEffect(() => {
    const seconds = getWaitTimeSeconds(index)

    const timeout = window.setTimeout(() => {
      let newIndex = index + 1

      // Messages check and assignment
      if (newIndex === 1) {
        let randomMessage =
          overlay?.messages?.[
            Math.floor(Math.random() * overlay?.messages?.length)
          ]
        setMessage(randomMessage)
        if (!randomMessage) newIndex += 1
      }

      if (newIndex > MAX_INDEX) newIndex = 0
      setIndex(newIndex)
    }, seconds * 1000)

    return () => {
      window.clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, messagesHash])

  if (!overlay || !overlay.socials?.length || !overlay.messages?.length)
    return null

  return (
    <Box
      color="text.primary"
      sx={{
        py: 1,
        borderRadius: 1,
        overflow: "hidden",
        backgroundColor: ({ overlay }) => overlay.statusBar,
        ...sx,
      }}
    >
      <StyledSocialsStack
        direction="row"
        display={index !== 0 ? "none" : undefined}
        spacing={2}
        justifyContent="space-between"
        px={2}
      >
        {overlay?.socials?.map((social) => (
          <SocialProfile
            key={`${social.platform}-${social.handle}`}
            platform={social.platform}
            label={social.handle}
          />
        ))}
      </StyledSocialsStack>

      <Box
        display={index !== 1 ? "none" : undefined}
        overflow="hidden"
        maxWidth="100%"
      >
        <StyledMessageTypography>{message}</StyledMessageTypography>
      </Box>
    </Box>
  )
}

export default StatusBar
