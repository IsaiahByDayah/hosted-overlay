import { useEffect } from "react"
import { Stack } from "@mui/material"

import Goals from "components/widgets/Goals"
import Tasks from "components/widgets/Tasks"
import StatusBar from "components/widgets/StatusBar"

import GreenScreen from "components/common/GreenScreen"

const MainSection = () => {
  useEffect(() => {
    window.document.getElementById("fake-button")?.click()
  }, [])

  return (
    <Stack
      spacing={2}
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        height: 1,
        backgroundColor: ({ overlay }) => overlay.mainBackground,
      }}
    >
      <GreenScreen aspectRatio="16:9" />

      <Stack sx={{ flexGrow: 1 }} spacing={5} direction="row">
        <Stack sx={{ flexGrow: 1 }}>
          <StatusBar />
          <Tasks />
        </Stack>
        <Goals />
      </Stack>
    </Stack>
  )
}

export default MainSection
