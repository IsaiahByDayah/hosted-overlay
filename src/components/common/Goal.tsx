import { useEffect, useState } from "react"
import { makeStyles, Typography } from "@material-ui/core"

import ProgressBar from "components/common/ProgressBar"

const useStyles = makeStyles(({ spacing }) => ({
  progressText: {
    fontWeight: 900,
  },
  label: {
    marginTop: spacing(0.5),
    fontWeight: 900,
  },
}))

export interface GoalProps {
  className?: string
  value: number | (() => Promise<number>)
  total: number
  label: string
  intervalTime?: number
}

const Goal = ({
  className,
  value,
  total,
  label,
  intervalTime = 1000 * 15,
}: GoalProps) => {
  const classes = useStyles()

  const [_value, setValue] = useState<number | undefined>(
    typeof value === "number" ? value : undefined
  )

  const getValue = async (): Promise<number | undefined> => {
    if (typeof value !== "number") {
      try {
        const newValue = await value()
        return newValue
      } catch (e) {
        return _value
      }
    } else {
      return value
    }
  }

  const updateValue = async () => {
    const newValue = await getValue()
    setValue(newValue)
  }

  useEffect(() => {
    updateValue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    const interval = window.setInterval(
      updateValue,
      _value ? intervalTime : 1000 * 1
    )

    return () => {
      window.clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  if (_value === null || _value === undefined) return null

  return (
    <div className={`${className} goal-root`}>
      <Typography className={classes.progressText} variant="caption">
        {_value} / {total}
      </Typography>
      <ProgressBar className="goal-progress-bar" percent={_value / total} />
      <Typography className={classes.label}>{label}</Typography>
    </div>
  )
}

export default Goal
