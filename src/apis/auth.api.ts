import { RegisterFormType } from 'src/types/auth.type'
import http from 'src/utils/http'

const authApi = {
    login: (body: { email: string; password: string }) => {
        return http.post('/auth/login', body)
    },
    register: (body: RegisterFormType) => {
        return http.post('/auth/sign', body)
    }
}

export default authApi
