export function getAccessToken() {
    return localStorage.getItem('accessToken') || ''
}

export function setAccessToken(token: string) {
    localStorage.setItem('accessToken', token)
}

export function setProfile(userId: string) {
    localStorage.setItem('userId', JSON.stringify(userId))
}

export function getProfile() {
    return localStorage.getItem('userId') || ''
}
