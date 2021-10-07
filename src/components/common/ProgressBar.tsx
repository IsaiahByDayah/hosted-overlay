import { Box } from "@mui/material"

import { clamp } from "lib/util"

export interface ProgressBarProps {
  percent: number
}

const ProgressBar = ({ percent = 0 }: ProgressBarProps) => {
  return (
    <Box
      sx={{
        borderRadius: 1,
        boxShadow: 4,
        height: ({ spacing }) => spacing(2),
        minWidth: 200,
        overflow: "hidden",
        padding: 0,
        backgroundColor: ({ overlay }) => overlay.progressBackground,
      }}
    >
      <Box
        sx={{
          backgroundColor: ({ overlay }) => overlay.progressFill,
          transition: "width 0.5s",
          height: 1,
          width: clamp(0, percent, 1),
        }}
      />
    </Box>
  )
}

export default ProgressBar
