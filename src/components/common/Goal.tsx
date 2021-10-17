import { useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"

import ProgressBar from "components/common/ProgressBar"

export interface GoalProps {
  value: number | (() => Promise<number>)
  total: number
  label?: string
  intervalTime?: number
}

const Goal = ({ value, total, label, intervalTime = 1000 * 15 }: GoalProps) => {
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
    <Box>
      <Typography
        sx={{
          fontWeight: "bold",
        }}
        variant="caption"
      >
        {_value} / {total}
      </Typography>
      <ProgressBar percent={_value / total} />
      {label && (
        <Typography sx={{ marginTop: 0.5, fontWeight: "bold" }}>
          {label}
        </Typography>
      )}
    </Box>
  )
}

export default Goal
