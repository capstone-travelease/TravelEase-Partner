import React, { createContext, useState } from 'react'

interface AppContextInterface {
    isAuthenticated: boolean
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const initialContext = {
    isAuthenticated: true,
    setIsAuthenticated: () => null
}

export const AppContext = createContext<AppContextInterface>(initialContext)

export default function AppProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(initialContext.isAuthenticated)

    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
