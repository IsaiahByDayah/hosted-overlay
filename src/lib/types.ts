export interface Message {
  id: string
  username: string
  message: string
  color: string
  sent?: boolean
}

export interface Task {
  id: string
  label: string
  description?: string
  completed?: boolean
}
