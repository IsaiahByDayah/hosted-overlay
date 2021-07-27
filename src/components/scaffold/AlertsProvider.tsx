import { createContext, useContext, useState, ReactNode } from "react"
import { Modal, Typography, Box } from "@material-ui/core"

import Alert from "components/common/Alert"

interface AlertBase {
  id: string
  color: string
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
    console.log("Enqueuing Alert: ", alert)
    setQueue((_queue) => [..._queue, alert])
  }

  const activeAlert: AlertBase | undefined = queue[activeIndex]

  return (
    <AlertsContext.Provider value={{ enqueueAlert }}>
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
            duration={5}
            onComplete={() => {
              console.log("Finished Alert: ", activeAlert)
              setActiveIndex((_activeIndex) => activeIndex + 1)
            }}
          >
            <div
              style={{
                height: "50vh",
                width: "50vw",
                backgroundColor: activeAlert?.color,
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
