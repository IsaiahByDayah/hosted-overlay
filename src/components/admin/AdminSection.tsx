import { ReactNode } from "react"
import { Box, Stack, Typography } from "@mui/material"

export interface AdminSectionProps {
  children?: ReactNode
  title: string
}

const AdminSection = ({ title, children }: AdminSectionProps) => {
  return (
    <Stack spacing={2}>
      <Typography fontWeight="bold">{title}</Typography>
      <Box>{children}</Box>
    </Stack>
  )
}

export default AdminSection
