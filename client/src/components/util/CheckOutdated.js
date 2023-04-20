import { Outlet, Navigate } from 'react-router-dom'
import * as rdd from "react-device-detect"
import React from "react"

const CheckOutdated = () => {

    return (
        (rdd.isIE) ? <Navigate to="/outdatedbrowser" /> : <Outlet />
    )
}

export default CheckOutdated;