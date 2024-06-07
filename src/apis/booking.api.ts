import http from 'src/utils/http'

type BookingList = {
    code: number
    message: string
    result: {
        bookingId: number
        roomName: string
        bookingStatus: number
        date: number
    }[]
}

export const bookingApi = {
    getBooking: (body: { date: string }) => {
        return http.post<BookingList>('/booking-management/ticket', body)
    }
}
