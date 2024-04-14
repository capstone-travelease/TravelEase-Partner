import { isAxiosError, AxiosError } from 'axios'

export function isAxiosBadRequest(error: unknown): error is AxiosError<{ code: number; message: string }> {
    return isAxiosError(error) && error.response?.status === 400
}

export function isAxiosUnauthorized<T>(error: unknown): error is AxiosError<T> {
    return isAxiosError(error) && error.response?.status === 401
}

export function checkStatusHotel(status: number) {
    console.log(status)
    switch (status) {
        case 1:
            return {
                status: false,
                text: 'View Now'
            }
        case 2:
            return {
                status: true,
                text: 'Awaiting Approval'
            }
        case 3:
            return {
                status: true,
                text: 'Rejected'
            }
        case 4:
            return {
                status: true,
                text: 'Disabled'
            }
        default:
            return {
                status: true,
                text: 'View Now'
            }
    }
}
