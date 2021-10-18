import useValidTwitchToken from "hooks/useValidTwitchToken"

import AdminSection from "components/admin/AdminSection"
import StreamChannels from "components/admin/fields/StreamChannels"
import ChatCommands from "components/admin/fields/ChatCommands"

import ConnectTwitchButton from "components/common/ConnectTwitchButton"

const StreamBot = () => {
  useValidTwitchToken()

  return (
    <AdminSection title="Stream Bot" extra={<ConnectTwitchButton />}>
      <StreamChannels />
      <ChatCommands />
    </AdminSection>
  )
}

export default StreamBot
