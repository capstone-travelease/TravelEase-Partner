import { AddHotelData } from 'src/pages/CreateHotel/layouts/CreateHotelLayout/CreateHotelLayout'
import { AddHotelResponse, HotelResponse } from 'src/types/hotel.type'
import http from 'src/utils/http'

const hotelApi = {
    getHotelList: (userId: string) => {
        return http.get<HotelResponse>(`/api/hotels?userId=${userId}`)
    },
    addHotel: (body: AddHotelData) => {
        return http.post<AddHotelResponse>('/api/hotels', body)
    },
    uploadImage: ({ hotelId, formData }: { hotelId: number; formData: FormData }) => {
        return http.post<{
            code: number
            message: string
            hotelId: null
        }>(`/api/hotels/image?hotelId=${hotelId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }
}

export default hotelApi
