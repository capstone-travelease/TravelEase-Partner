import { Profile } from 'src/types/user.type'

export const localStorageEventTarget = new EventTarget()

export function getAccessToken() {
    return localStorage.getItem('accessToken') || ''
}

export function setAccessToken(token: string) {
    localStorage.setItem('accessToken', token)
}

export function setProfile(profile: Profile) {
    localStorage.setItem('profile', JSON.stringify(profile))
}

export function getProfile() {
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(profile) : null
}

export function clearLocalStorage() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('profile')
    const clearLSEvent = new Event('clearLS')
    localStorageEventTarget.dispatchEvent(clearLSEvent)
}
