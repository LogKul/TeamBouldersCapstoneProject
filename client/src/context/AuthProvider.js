import { createContext, useState, useEffect } from "react"

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext