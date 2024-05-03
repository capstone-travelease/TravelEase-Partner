import axios, { AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse } from 'src/types/auth.type'
import { clearLocalStorage, getAccessToken, setAccessToken, setProfile } from 'src/utils/auth'
import { isAxiosExpiredTokenError } from 'src/utils/utils'

class Http {
    instance: AxiosInstance
    accessToken: string
    constructor() {
        this.accessToken = getAccessToken()
        this.instance = axios.create({
            baseURL: 'https://www.capstone-api-partner.online/partner',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        this.instance.interceptors.request.use(
            (config) => {
                if (this.accessToken && config.headers) {
                    config.headers.Authorization = `${this.accessToken}`
                }
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )
        this.instance.interceptors.response.use(
            (response) => {
                if (response.config.url === '/auth/login') {
                    this.accessToken = (response.data as AuthResponse).data.token
                    setAccessToken(this.accessToken)
                    setProfile({
                        userId: (response.data as AuthResponse).data.userId,
                        fullName: (response.data as AuthResponse).data.fullName
                    })
                }
                return response
            },
            (error) => {
                if (isAxiosExpiredTokenError(error)) {
                    this.accessToken = ''
                    clearLocalStorage()
                    toast.error('Your session has expired. Please login again.')
                }
                return Promise.reject(error)
            }
        )
    }
}

const http = new Http().instance
export default http
