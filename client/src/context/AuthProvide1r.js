import { React, createContext, useState, useEffect } from "react"
import axios from "../api/axios"

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})

    let logout = () => {
        setAuth({})
    }

    let refreshToken = async () => {
        try {
            const REFRESH_URL = process.env.REACT_APP_API_URL + "/auth/refresh"

            console.log(auth.user)
            console.log(auth.accessToken)
            const response = await axios.get(REFRESH_URL,
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
            setAuth({ user, accessToken })
            console.log("CURRENT AUTH: ");
            console.log(auth);
        } catch (err) {
            console.log(err?.response)
            console.log(err)
        }
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout, refreshToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext