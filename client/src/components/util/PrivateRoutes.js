import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../../context/AuthProvider'

const PrivateRoutes = () => {
    let { auth, setAuth, refreshToken } = useContext(AuthContext)

    return (
        auth.accessToken ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;