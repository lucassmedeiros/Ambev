import { Navigate, Outlet } from 'react-router-dom'

import { useSession } from '../context/SessionContext'

const ProtectedRoute = () => {
  const { token } = useSession()
  console.log('tokefffn', token)

  return token ? <Outlet /> : <Navigate to={`/login`} />
}

export default ProtectedRoute
