import { Box } from "@mui/material"
import { SxProps, Theme } from "@mui/system"

// import { getFollowerCount, getSubscriberCount } from "lib/twitch"

import Goal from "components/common/Goal"

export interface GoalsProps {
  sx?: SxProps<Theme> | undefined
}

const Goals = ({ sx }: GoalsProps) => {
  const nameCount = 124
  const numNamesWrong = 0

  return (
    <Box
      color="text.primary"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        ...sx,
      }}
    >
      <Goal
        label="Correct Pronounciations"
        total={nameCount}
        value={nameCount - numNamesWrong}
      />
      {/* <Goal label="Follower Goal" total={625} value={getFollowerCount} />
      <Goal label="Subscriber Goal" total={85} value={getSubscriberCount} /> */}
    </Box>
  )
}

export default Goals
