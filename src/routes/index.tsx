import { Route, Routes } from 'react-router-dom'

import UnprotectedRoute from './UnprotectedRoute'
import ProtectedRoute from './ProtectedRoute'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Form from '../pages/EmployeeForm'

const RootRoutes = () => {
  return (
    <Routes>
      <Route element={<UnprotectedRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/form" element={<Form />} />
      </Route>
      <Route path="*" element={<span> 404 - Not Found </span>} />
    </Routes>
  )
}

export default RootRoutes
