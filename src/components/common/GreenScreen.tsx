import { Box } from "@mui/material"

import { AspectRatio } from "lib/types"
import { calculateAspectRatioVerticalPadding } from "lib/util"

export interface GreenScreenProps {
  aspectRatio?: AspectRatio
  color?: string
}

const GreenScreen = ({ aspectRatio = "16:9", color }: GreenScreenProps) => {
  return (
    <Box
      sx={{
        backgroundColor: ({ overlay }) => color ?? overlay.chromaKey,
        borderRadius: 1,
        boxShadow: 4,
        overflow: "hidden",
        width: 1,
        minWidth: 100,
        height: 0,
        paddingBottom: calculateAspectRatioVerticalPadding(aspectRatio),
      }}
    />
  )
}

export default GreenScreen
