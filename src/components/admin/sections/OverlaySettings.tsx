import AdminSection from "components/admin/AdminSection"

import CurrentTopic from "components/admin/fields/CurrentTopic"
import ColorAndTheming from "components/admin/fields/ColorAndTheming"
import ChatDisplaySettings from "components/admin/fields/ChatDisplaySettings"
import SocialHandles from "components/admin/fields/SocialHandles"
import Messages from "components/admin/fields/Messages"

import OpenOverlayButton from "components/common/OpenOverlayButton"

const OverlaySettings = () => (
  <AdminSection title="Overlay Settings" extra={<OpenOverlayButton />}>
    <CurrentTopic />
    <ChatDisplaySettings />
    <SocialHandles />
    <Messages />
    <ColorAndTheming />
  </AdminSection>
)

export default OverlaySettings
