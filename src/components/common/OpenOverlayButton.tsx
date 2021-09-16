import { Button } from "@material-ui/core"
import { HiOutlineExternalLink } from "react-icons/hi"

import { useAuthContext } from "components/scaffold/AuthProvider"

const OpenOverlayButton = () => {
  const { user } = useAuthContext()

  return (
    <Button
      variant="contained"
      href={`/${user?.uid}/overlay`}
      target="_blank"
      endIcon={<HiOutlineExternalLink />}
      disabled={!user}
    >
      Open Overlay
    </Button>
  )
}

export default OpenOverlayButton
