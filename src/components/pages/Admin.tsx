import { Stack, Typography, Container } from "@mui/material"

import OverlaySettings from "components/admin/sections/OverlaySettings"
import ChannelPointRedemptions from "components/admin/sections/ChannelPointRedemptions"
import StreamStats from "components/admin/sections/StreamStats"
import StreamBot from "components/admin/sections/StreamBot"

import Header from "components/common/Header"

const Admin = () => (
  <div>
    <Header />
    <Container component={Stack} spacing={5} sx={{ py: 5 }}>
      <Typography fontWeight="bold" variant="h5" textAlign="center">
        Admin Panel
      </Typography>
      <OverlaySettings />
      <StreamBot />
      <StreamStats />
      <ChannelPointRedemptions />
    </Container>
  </div>
)

export default Admin
