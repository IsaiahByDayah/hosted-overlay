import { Stack, Divider } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { updateDoc } from "firebase/firestore"
import { customAlphabet } from "nanoid"
import { nolookalikesSafe } from "nanoid-dictionary"

import { Count } from "lib/types"

import { useCurrentStreamStats } from "hooks/useStreamStats"

import AdminField from "components/admin/AdminField"

import CountField from "components/common/CountField"

const nanoid = customAlphabet(nolookalikesSafe, 6)

const StreamCounts = () => {
  const [streamStats, streamStatsDocRef] = useCurrentStreamStats()

  const createCount = async () => {
    const count: Count = {
      id: nanoid(),
      value: 0,
    }

    await updateDoc(streamStatsDocRef, {
      counts: [count, ...(streamStats?.counts ?? [])],
    })
  }

  const onSave = async (count: Count) => {
    const counts = (streamStats?.counts ?? []).map((c) => {
      if (c.id === count.id) {
        return count
      }
      return c
    })
    await updateDoc(streamStatsDocRef, {
      counts,
    })
  }

  const onDelete = async (id: string) => {
    await updateDoc(streamStatsDocRef, {
      counts: (streamStats?.counts ?? []).filter((c) => !(c.id === id)),
    })
  }

  return (
    <AdminField
      title="Stream Counts"
      description="Create and manage counters used as a part of stream"
    >
      <Stack spacing={2} divider={<Divider />}>
        <LoadingButton
          variant="contained"
          loading={!streamStats}
          onClick={() => createCount()}
        >
          Create New Count
        </LoadingButton>

        {streamStats?.counts?.map((count) => (
          <CountField
            key={count.id}
            count={count}
            onSave={onSave}
            onDelete={onDelete}
          />
        ))}
      </Stack>
    </AdminField>
  )
}

export default StreamCounts
