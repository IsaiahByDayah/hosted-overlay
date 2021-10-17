import AdminSection from "components/admin/AdminSection"

import StreamCounts from "components/admin/fields/StreamCounts"
import StreamGoals from "components/admin/fields/StreamGoals"

const StreamStats = () => (
  <AdminSection title="Stream Stats">
    <StreamCounts />
    <StreamGoals />
  </AdminSection>
)

export default StreamStats
