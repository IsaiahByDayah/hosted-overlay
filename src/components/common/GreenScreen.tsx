import { Box } from "@mui/material"

import { AspectRatio } from "lib/types"
import { calculateAspectRatioVerticalPadding } from "lib/util"

export interface GreenScreenProps {
  aspectRatio?: AspectRatio
}

const GreenScreen = ({ aspectRatio = "16:9" }: GreenScreenProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "#00ff00",
        borderRadius: ({ shape }) => shape.borderRadius,
        boxShadow: ({ shadows }) => shadows[4],
        overflow: "hidden",

        width: "100%",
        minWidth: 100,
        height: 0,
        paddingBottom: calculateAspectRatioVerticalPadding(aspectRatio),
      }}
    />
  )
}

export default GreenScreen
