import { useState, useEffect } from "react"
import { Stack, Typography, Button, Select, MenuItem } from "@mui/material"
import { DarkModeRounded, LightModeRounded } from "@mui/icons-material"
import { doc, updateDoc, deleteField } from "firebase/firestore"

import firebase from "lib/firebase"
import { OverlayTheme } from "lib/types"

import useOverlay from "hooks/useOverlay"

import { useAuthContext } from "components/scaffold/AuthProvider"

import AdminField from "components/admin/AdminField"

import ColorSelectField from "components/common/ColorSelectField"

const getFieldValue = (incoming: string, existing?: string) => {
  incoming = incoming.trim()
  existing = existing?.trim()

  if (Boolean(incoming)) {
    if (incoming === existing) return undefined
    return incoming
  }
  return deleteField()
}

const ColorAndTheming = () => {
  const { user } = useAuthContext()
  const overlay = useOverlay(user?.uid)
  const overlayDocRef = doc(firebase.firestore, `overlays/${user?.uid}`)

  const [mode, setMode] = useState<OverlayTheme["mode"]>("light")
  const [mainSection, setMainSection] = useState("")
  const [sidebar, setSidebar] = useState("")
  const [statusBar, setStatusBar] = useState("")
  const [card, setCard] = useState("")
  const [progressBackground, setProgressBackground] = useState("")
  const [progressFill, setProgressFill] = useState("")
  const [chromaKey, setChromaKey] = useState("")

  useEffect(() => {
    setMode(overlay?.defaultTheme?.mode ?? "light")

    if (mainSection === "")
      setMainSection(overlay?.defaultTheme?.mainSection ?? "")

    if (sidebar === "") setSidebar(overlay?.defaultTheme?.sidebar ?? "")

    if (statusBar === "") setStatusBar(overlay?.defaultTheme?.statusBar ?? "")

    if (card === "") setCard(overlay?.defaultTheme?.card ?? "")

    if (progressBackground === "")
      setProgressBackground(overlay?.defaultTheme?.progressBackground ?? "")

    if (progressFill === "")
      setProgressFill(overlay?.defaultTheme?.progressFill ?? "")

    if (chromaKey === "") setChromaKey(overlay?.defaultTheme?.chromaKey ?? "")

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overlay])

  const updateColorsAndTheming = async () => {
    await updateDoc(overlayDocRef, {
      "defaultTheme.mode": getFieldValue(mode, overlay?.defaultTheme?.mode),
      "defaultTheme.mainSection": getFieldValue(
        mainSection,
        overlay?.defaultTheme?.mainSection
      ),
      "defaultTheme.sidebar": getFieldValue(
        sidebar,
        overlay?.defaultTheme?.sidebar
      ),
      "defaultTheme.statusBar": getFieldValue(
        statusBar,
        overlay?.defaultTheme?.statusBar
      ),
      "defaultTheme.card": getFieldValue(card, overlay?.defaultTheme?.card),
      "defaultTheme.progressBackground": getFieldValue(
        progressBackground,
        overlay?.defaultTheme?.progressBackground
      ),
      "defaultTheme.progressFill": getFieldValue(
        progressFill,
        overlay?.defaultTheme?.progressFill
      ),
      "defaultTheme.chromaKey": getFieldValue(
        chromaKey,
        overlay?.defaultTheme?.chromaKey
      ),
    })
  }

  return (
    <AdminField
      title="Color And Theming"
      description="Adjust the colors used in the overlay"
    >
      <Stack spacing={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* {mode === "light" ? <LightModeRounded /> : <DarkModeRounded />} */}

          <Select
            size="small"
            value={mode}
            onChange={(e) => setMode(e.target.value as OverlayTheme["mode"])}
            sx={{
              ".MuiSelect-select": {
                display: "flex",
                alignItems: "center",
              },
            }}
          >
            <MenuItem value="light" dense>
              <LightModeRounded sx={{ mr: 1 }} /> Light
            </MenuItem>
            <MenuItem value="dark" dense>
              <DarkModeRounded sx={{ mr: 1 }} /> Dark
            </MenuItem>
          </Select>

          <Typography>
            <b>Theming Mode</b> - Adjusts text and other colors for better
            visbility
          </Typography>
        </Stack>

        <ColorSelectField
          color={mainSection}
          onChange={(color) => setMainSection(color)}
          title="Main Section"
          description="Background color of main content section"
        />

        <ColorSelectField
          color={sidebar}
          onChange={(color) => setSidebar(color)}
          title="Sidebar"
          description="Background color of the sidebar section"
        />

        <ColorSelectField
          color={statusBar}
          onChange={(color) => setStatusBar(color)}
          title="Status Bar"
          description="Background color of the status bar section"
        />

        <ColorSelectField
          color={card}
          onChange={(color) => setCard(color)}
          title="Card"
          description='Background color of various raised "card" elements'
        />

        <ColorSelectField
          color={progressBackground}
          onChange={(color) => setProgressBackground(color)}
          title="Progress Bar Background"
          description="Background color of progress bars"
        />

        <ColorSelectField
          color={progressFill}
          onChange={(color) => setProgressFill(color)}
          title="Progress Bar Fill"
          description="Fill color of progress bars"
        />

        <ColorSelectField
          color={chromaKey}
          onChange={(color) => setChromaKey(color)}
          title="Chroma Key"
          description="What color is used for GreenScreen widgets"
        />

        <Button variant="contained" onClick={() => updateColorsAndTheming()}>
          Update
        </Button>
      </Stack>
    </AdminField>
  )
}

export default ColorAndTheming
