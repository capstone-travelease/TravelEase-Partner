import React, { createContext, useState } from 'react'
import { Profile } from 'src/types/user.type'
import { getAccessToken, getProfile } from 'src/utils/auth'

interface AppContextInterface {
    isAuthenticated: boolean
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    profile: Profile | null
    setProfile: React.Dispatch<React.SetStateAction<Profile | null>>
    reset: () => void
}

const initialContext = {
    isAuthenticated: Boolean(getAccessToken()),
    setIsAuthenticated: () => null,
    profile: getProfile(),
    setProfile: () => null,
    reset: () => null
}

export const AppContext = createContext<AppContextInterface>(initialContext)

export default function AppProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(initialContext.isAuthenticated)
    const [profile, setProfile] = useState<Profile | null>(initialContext.profile)

    const reset = () => {
        setIsAuthenticated(false)
        setProfile(null)
    }

    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                profile,
                setProfile,
                reset
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
