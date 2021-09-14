import { Redirect } from "react-router-dom"

import { useAuthContext } from "components/scaffold/AuthProvider"

const AdminRedirect = () => {
  const { user } = useAuthContext()

  if (user) return <Redirect to={`/${user?.uid}`} />
  else return null
}

export default AdminRedirect
