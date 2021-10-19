import { ReactNode } from "react"
import { Box, Stack, Typography } from "@mui/material"
import { SxProps, Theme } from "@mui/system"

export interface AdminSectionProps {
  children?: ReactNode
  extra?: ReactNode
  title: ReactNode
  titleSx?: SxProps<Theme> | undefined
}

const AdminSection = ({
  title,
  children,
  extra,
  titleSx,
}: AdminSectionProps) => {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} alignItems="baseline">
        {typeof title === "string" ? (
          <Typography fontWeight="bold" flexGrow={1}>
            {title}
          </Typography>
        ) : (
          title
        )}
        {extra}
      </Stack>
      <Box>{children}</Box>
    </Stack>
  )
}

export default AdminSection
