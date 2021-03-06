import { Button } from "@mui/material"
import { HiOutlineExternalLink } from "react-icons/hi"

import { useAuthContext } from "components/scaffold/AuthProvider"

const OpenOverlayButton = () => {
  const { user } = useAuthContext()

  return (
    <Button
      variant="contained"
      href={`/overlay/${user?.uid}`}
      target="_blank"
      endIcon={<HiOutlineExternalLink />}
      disabled={!user}
    >
      Open Overlay
    </Button>
  )
}

export default OpenOverlayButton
