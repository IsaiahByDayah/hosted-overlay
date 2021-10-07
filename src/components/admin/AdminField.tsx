import { ReactNode } from "react"
import {
  Stack,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material"
import { ExpandMoreRounded } from "@mui/icons-material"

export interface AdminFieldProps {
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  expanded?: boolean
}

const AdminField = ({
  title,
  description,
  children,
  expanded,
}: AdminFieldProps) => {
  return (
    <Accordion expanded={expanded}>
      <AccordionSummary expandIcon={<ExpandMoreRounded />}>
        <Stack direction="row" alignItems="baseline" spacing={2} flexGrow={1}>
          <Typography
            sx={{ width: { xs: "33%", sm: "25%", md: "20%" }, flexShrink: 0 }}
          >
            {title}
          </Typography>
          {description && (
            <Typography sx={{ color: "text.secondary" }}>
              {description}
            </Typography>
          )}
        </Stack>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  )
}

export default AdminField
