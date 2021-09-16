import { Typography, Paper } from "@mui/material";

import makeStyles from '@mui/styles/makeStyles';

import { useOverlayContext } from "components/scaffold/OverlayProvider"

const useStyles = makeStyles(({ spacing }) => ({
  label: {
    fontWeight: 900,
    marginBottom: spacing(1.5),
  },
  paper: {
    padding: spacing(1, 2),
  },
  topic: {
    fontWeight: 700,
  },
}))

export interface CurrentTopicProps {
  className?: string
}
const CurrentTopic = ({ className }: CurrentTopicProps) => {
  const classes = useStyles()
  const { overlay } = useOverlayContext()

  return (
    <div className={className}>
      <Typography className={classes.label} align="center" variant="h5">
        Current Topic
      </Typography>
      <Paper className={classes.paper}>
        <Typography className={classes.topic} align="center" variant="h6">
          {overlay?.currentTopic ?? "Having fun!"}
        </Typography>
      </Paper>
    </div>
  )
}

export default CurrentTopic
