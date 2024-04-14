export interface RegisterFormType {
    email: string
    name: string
    password: string
    phonenumber: number
    gender: boolean
    birthday: string
}

export interface AuthResponse {
    code: number
    message: string
    data: {
        fullname: string
        userId: string
        token: string
    }
}
