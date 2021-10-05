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
        backgroundColor: "primary.contrastText",
        height: ({ spacing }) => spacing(2),
        minWidth: 200,
        overflow: "hidden",
        padding: 0,
      }}
    >
      <Box
        sx={{
          backgroundColor: "primary.main",
          transition: "width 0.5s",
          height: 1,
          width: clamp(0, percent, 1),
        }}
      />
    </Box>
  )
}

export default ProgressBar
