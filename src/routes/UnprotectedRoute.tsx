import { useEffect } from 'react'
import { Navigate, Outlet, useNavigate, useParams } from 'react-router-dom'

import { useSession } from '../context/SessionContext'

const UnprotectedRoute = () => {
  const { token } = useSession()
  console.log('token', token)
  return token ? <Navigate to="/dashboard" /> : <Outlet />
}

export default UnprotectedRoute
