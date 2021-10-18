import useValidTwitchToken from "hooks/useValidTwitchToken"

import AdminSection from "components/admin/AdminSection"

import ConnectTwitchButton from "components/common/ConnectTwitchButton"

const StreamBot = () => {
  useValidTwitchToken()

  return (
    <AdminSection
      title="Stream Bot"
      extra={<ConnectTwitchButton />}
    ></AdminSection>
  )
}

export default StreamBot
