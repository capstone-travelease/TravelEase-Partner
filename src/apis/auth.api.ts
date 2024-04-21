import { AuthResponse, RegisterFormType } from 'src/types/auth.type'
import http from 'src/utils/http'

const authApi = {
    login: (body: { email: string; password: string }) => {
        return http.post<AuthResponse>('/auth/login', body)
    },
    register: (body: Omit<RegisterFormType, 'confirmPassword'>) => {
        return http.post<{ code: number; userId: string | number; message: string }>('/auth/sign', body)
    },
    uploadIdentity: (userId: string, body: FormData) => {
        return http.post(`/auth/upload?userId=${userId}`, body, { headers: { 'Content-Type': 'multipart/form-data' } })
    }
}

export default authApi
