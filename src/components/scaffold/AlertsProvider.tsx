import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"
import { Modal, Typography, Box } from "@material-ui/core"

import TwitchAlerts from "components/widgets/TwitchAlerts"

import Alert from "components/common/Alert"

const DEFAULTY_ALERT_DURARTION = 5

interface AlertBase {
  id: string
  color?: string
  hidden?: boolean
  duration?: number
  onStart?: () => void
  onEnd?: () => void
}

interface AlertsContextData {
  enqueueAlert: (alert: AlertBase) => void
}

const AlertsContext = createContext<AlertsContextData>({
  enqueueAlert: () => {},
})

interface AlertsProviderProps {
  children?: ReactNode
}

const AlertsProvider = ({ children }: AlertsProviderProps) => {
  const [queue, setQueue] = useState<AlertBase[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  const enqueueAlert = (alert: AlertBase) => {
    // console.log("Enqueuing Alert: ", alert)
    alert.id = alert.id ?? Date.now().toString()
    setQueue((_queue) => {
      if (_queue.find((q) => q.id === alert.id)) return _queue
      return [..._queue, alert]
    })
  }

  const activeAlert: AlertBase | undefined = queue[activeIndex]

  useEffect(() => {
    activeAlert?.onStart?.()
  }, [activeAlert])

  const nextAlert = () => {
    activeAlert?.onEnd?.()
    setActiveIndex((_activeIndex) => activeIndex + 1)
  }

  return (
    <AlertsContext.Provider value={{ enqueueAlert }}>
      <TwitchAlerts />
      {children}
      <Modal open={Boolean(activeAlert)} hideBackdrop>
        <Box
          height="100%"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Alert
            key={activeAlert?.id}
            duration={activeAlert?.duration ?? DEFAULTY_ALERT_DURARTION}
            onComplete={() => {
              nextAlert()
            }}
          >
            <div
              style={{
                height: "50vh",
                width: "50vw",
                backgroundColor: activeAlert?.color ?? "#006d77",
                display: activeAlert?.hidden ? "none" : undefined,
              }}
            >
              <Typography variant="h1">Alert: {activeAlert?.id}</Typography>
            </div>
          </Alert>
        </Box>
      </Modal>
    </AlertsContext.Provider>
  )
}

export const useAlerts = () => useContext(AlertsContext)

export default AlertsProvider
