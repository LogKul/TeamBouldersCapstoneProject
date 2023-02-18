import React, { useContext, useEffect, useState } from 'react'
import { Outlet, Navigate, Link } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import axios from "../api/axios"
import '../styles/header.scss'

function Refresh() {
    let { auth, setAuth } = useContext(AuthContext)

    const [success, setSuccess] = useState(true)

    const refreshToken = async () => {
        try {
            const URL = process.env.REACT_APP_API_URL + "/auth/refresh"
            const response = await axios.get(URL,
                {
                    params: {
                        username: auth.user,
                    },
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": auth.accessToken,
                    },
                    withCredentials: false
                }
            )
            console.log(JSON.stringify(response))
            const accessToken = response?.data?.accessToken
            const user = auth.user
            console.log(response?.status)
            setAuth({ user, accessToken })

        } catch (err) {
            console.log(err.response.status)
            if (err.response.status !== 429) {
                setSuccess(false)
            }
        }
    }

    useEffect(() => {
        refreshToken()
    }, [])

    return (
        <div>
            {!success && <Navigate to="/login" />}
        </div>
    )
}

export default Refresh