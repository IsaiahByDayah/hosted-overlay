import { makeStyles } from "@material-ui/core"
import cx from "clsx"

import { getFollowerCount, getSubscriberCount } from "lib/twitch"

import Goal from "components/common/Goal"

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}))

export interface GoalsProps {
  className?: string
}

const Goals = ({ className }: GoalsProps) => {
  const classes = useStyles()
  return (
    <div className={cx(classes.root, className)}>
      <Goal label="Correct Pronounciations" total={100} value={100} />
      <Goal label="Follower Goal" total={600} value={getFollowerCount} />
      <Goal label="Subscriber Goal" total={75} value={getSubscriberCount} />
    </div>
  )
}

export default Goals
