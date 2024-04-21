export interface RegisterFormType {
    email: string
    name: string
    password: string
    phonenumber: number
    gender: boolean
    birthday: string
    confirmPassword: string
}

export interface AuthResponse {
    code: number
    message: string
    data: {
        fullName: string
        userId: string
        token: string
    }
}

export interface ExpiredTokenResponse {
    code: number
    message: string
    error: string
}

export interface SuccessResponse<T> {
    code: number
    message: string
    data: T | null
}
