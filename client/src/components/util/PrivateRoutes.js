import { Outlet, Navigate } from 'react-router-dom'
import React from "react"

const PrivateRoutes = () => {
    let accessToken = sessionStorage.getItem("accessToken")

    return (
        accessToken ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;