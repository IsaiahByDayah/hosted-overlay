import { useEffect, ReactNode } from "react"

export interface AlertProps {
  children?: ReactNode
  // active: boolean
  duration: number
  onComplete: () => void
}

const Alert = ({ children, duration, onComplete }: AlertProps) => {
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      onComplete()
    }, duration * 1000)

    return () => {
      window.clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}

export default Alert
