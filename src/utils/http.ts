import axios, { AxiosInstance } from 'axios'
import { AuthResponse } from 'src/types/auth.type'
import { getAccessToken, setAccessToken, setProfile } from 'src/utils/auth'

class Http {
    instance: AxiosInstance
    accessToken: string
    constructor() {
        this.accessToken = getAccessToken()
        this.instance = axios.create({
            baseURL: 'http://34.87.40.248:7590',
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
                    setProfile((response.data as AuthResponse).data.userId)
                }
                return response
            },
            (error) => {
                return Promise.reject(error)
            }
        )
    }
}

const http = new Http().instance
export default http
