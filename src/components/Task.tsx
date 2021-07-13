interface TaskProps {
  className?: string
  label: string
  description?: string
}

const Task = ({ className, label, description }: TaskProps) => (
  <div className={`${className} task-root rounded`}>
    <p className="bold medium-text">{label}</p>
    {description && (
      <p className="medium-text task-description">{description}</p>
    )}
  </div>
)

export default Task
