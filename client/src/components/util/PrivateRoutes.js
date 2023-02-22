import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    let accessToken = sessionStorage.getItem("accessToken")

    return (
        accessToken ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;