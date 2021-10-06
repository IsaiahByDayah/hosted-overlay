import { ReactNode } from "react"
import { Box, Stack, Typography } from "@mui/material"

export interface AdminSectionProps {
  children?: ReactNode
  extra?: ReactNode
  title: string
}

const AdminSection = ({ title, children, extra }: AdminSectionProps) => {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} alignItems="baseline">
        <Typography fontWeight="bold" flexGrow={1}>
          {title}
        </Typography>
        {extra}
      </Stack>
      <Box>{children}</Box>
    </Stack>
  )
}

export default AdminSection
