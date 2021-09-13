import { createContext, useContext, ReactNode } from "react"

import { Overlay } from "lib/types"

interface OverlayContextData {
  overlay?: Overlay | null
}

const OverlayContext = createContext<OverlayContextData>({
  overlay: undefined,
})

interface OverlayProviderProps {
  children?: ReactNode
  overlay?: Overlay | null
}

const OverlayProvider = ({ children, overlay }: OverlayProviderProps) => {
  return (
    <OverlayContext.Provider value={{ overlay }}>
      {children}
    </OverlayContext.Provider>
  )
}

export const useOverlayContext = () => useContext(OverlayContext)

export default OverlayProvider
