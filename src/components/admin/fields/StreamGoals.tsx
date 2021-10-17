import { Stack, Divider } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { updateDoc } from "firebase/firestore"
import { customAlphabet } from "nanoid"
import { nolookalikesSafe } from "nanoid-dictionary"

import { Goal } from "lib/types"

import { useCurrentStreamStats } from "hooks/useStreamStats"

import AdminField from "components/admin/AdminField"

import GoalField from "components/common/GoalField"

const nanoid = customAlphabet(nolookalikesSafe, 6)

const StreamGoals = () => {
  const [streamStats, streamStatsDocRef] = useCurrentStreamStats()

  const createGoal = async () => {
    const goal: Goal = {
      id: nanoid(),
      countId: "",
      target: 1,
    }

    await updateDoc(streamStatsDocRef, {
      goals: [goal, ...(streamStats?.goals ?? [])],
    })
  }

  const onSave = async (goal: Goal) => {
    const goals = (streamStats?.goals ?? []).map((g) => {
      if (g.id === goal.id) {
        return goal
      }
      return g
    })
    await updateDoc(streamStatsDocRef, {
      goals,
    })
  }

  const onDelete = async (id: string) => {
    await updateDoc(streamStatsDocRef, {
      goals: (streamStats?.goals ?? []).filter((g) => !(g.id === id)),
    })
  }

  return (
    <AdminField
      title="Stream Goals"
      description="Create and manage counter goals for use on stream"
    >
      <Stack spacing={2} divider={<Divider />}>
        <LoadingButton
          variant="contained"
          loading={!streamStats}
          onClick={() => createGoal()}
        >
          Create New Goal
        </LoadingButton>

        {streamStats?.goals?.map((goal) => (
          <GoalField
            key={goal.id}
            goal={goal}
            onSave={onSave}
            onDelete={onDelete}
          />
        ))}
      </Stack>
    </AdminField>
  )
}

export default StreamGoals
