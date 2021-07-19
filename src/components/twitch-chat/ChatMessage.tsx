import {} from "twitch-js"

export interface ChatMessageProps {
  username: string
  message: string
  color?: string
}

const ChatMessage = ({ username, message, color }: ChatMessageProps) => {
  return (
    <div style={{ display: "flex", marginBottom: 16 }}>
      <p style={{ color: color }}>{username}</p>{" "}
      <p style={{ marginLeft: 8 }}>{message}</p>
    </div>
  )
}

export default ChatMessage
