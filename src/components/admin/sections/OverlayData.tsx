import AdminSection from "components/admin/AdminSection"

import CurrentTopic from "components/admin/fields/CurrentTopic"
import SocialHandles from "components/admin/fields/SocialHandles"
import Messages from "components/admin/fields/Messages"

const OverlayData = () => (
  <AdminSection title="Overlay Data">
    <CurrentTopic />
    <SocialHandles />
    <Messages />
  </AdminSection>
)

export default OverlayData
