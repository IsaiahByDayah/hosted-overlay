import { makeStyles, Typography, Paper } from "@material-ui/core"

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

  return (
    <div className={className}>
      <Typography className={classes.label} align="center" variant="h5">
        Current Topic
      </Typography>
      <Paper className={classes.paper}>
        <Typography className={classes.topic} align="center" variant="h6">
          Messing with Google TTS
        </Typography>
      </Paper>
    </div>
  )
}

export default CurrentTopic
