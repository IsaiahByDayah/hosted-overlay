import { useMemo } from "react"
import { Box } from "@mui/material"
import { SxProps, Theme } from "@mui/system"

// import { getFollowerCount, getSubscriberCount } from "lib/twitch"

import { useOverlayContext } from "components/scaffold/OverlayProvider"

import Goal from "components/common/Goal"
import useStreamStats from "hooks/useStreamStats"

export interface GoalsProps {
  sx?: SxProps<Theme> | undefined
}

const Goals = ({ sx }: GoalsProps) => {
  const { overlay } = useOverlayContext()
  const [streamStats] = useStreamStats(overlay?.id)

  const activeGoals = useMemo(
    () =>
      streamStats?.goals
        ?.filter((g) => !g.disabled)
        .filter((g) => {
          const count = streamStats?.counts?.find(
            (count) => count.id === g.countId
          )

          return count !== undefined
        }),
    [streamStats]
  )

  if (!Boolean(activeGoals) || !activeGoals?.length) return null

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
      {activeGoals?.map((goal) => {
        const count = streamStats?.counts?.find(
          (count) => count.id === goal.countId
        )

        if (!count) return null

        return (
          <Goal
            key={goal.id}
            label={count.title ?? count.id}
            total={goal.target}
            value={count.value}
          />
        )
      })}
    </Box>
  )
}

export default Goals
