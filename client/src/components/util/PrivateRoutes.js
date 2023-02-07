import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../../context/AuthProvider'

const PrivateRoutes = () => {
    let { auth } = useContext(AuthContext)

    return (
        { auth } ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;