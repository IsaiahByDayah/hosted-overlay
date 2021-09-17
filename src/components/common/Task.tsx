import { Typography, Paper } from "@mui/material"

export interface TaskProps {
  label: string
  description?: string
  completed?: boolean
}

const Task = ({ label, description, completed }: TaskProps) => {
  return (
    <Paper
      elevation={completed ? 0 : 3}
      sx={{
        py: 1,
        px: 2,
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          opacity: completed ? 0.54 : undefined,
          textDecoration: completed ? "line-through" : undefined,
        }}
      >
        {label}
      </Typography>
      {description && (
        <Typography
          variant="body2"
          sx={{
            opacity: completed ? 0.54 : undefined,
          }}
        >
          {description}
        </Typography>
      )}
    </Paper>
  )
}

export default Task
