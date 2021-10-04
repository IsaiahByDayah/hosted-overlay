import { Box, Typography, Paper } from "@mui/material"
import { SxProps, Theme } from "@mui/system"

import { useOverlayContext } from "components/scaffold/OverlayProvider"

export interface CurrentTopicProps {
  sx?: SxProps<Theme> | undefined
}
const CurrentTopic = ({ sx }: CurrentTopicProps) => {
  const { overlay } = useOverlayContext()

  return (
    <Box sx={sx}>
      <Typography fontWeight={900}>Currently...</Typography>
      <Paper
        sx={{
          py: 1,
          px: 2,
        }}
      >
        <Typography align="center" variant="h6">
          {overlay?.currentTopic ?? "Having fun!"}
        </Typography>
      </Paper>
    </Box>
  )
}

export default CurrentTopic
