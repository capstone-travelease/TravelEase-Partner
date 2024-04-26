import { AddHotelData, HotelDetailFormValue } from 'src/pages/CreateHotel/layouts/CreateHotelLayout/CreateHotelLayout'
import { AddHotelResponse, DetailHotelResponse, HotelResponse } from 'src/types/hotel.type'
import http from 'src/utils/http'

const hotelApi = {
    getHotelList: (userId: string) => {
        return http.get<HotelResponse>(`/hotel-management/hotels?userId=${userId}`)
    },
    addHotel: (body: AddHotelData) => {
        return http.post<AddHotelResponse>('/hotel-management/hotels', body)
    },
    uploadImage: ({ hotelId, formData }: { hotelId: number; formData: FormData }) => {
        return http.post<{
            code: number
            message: string
            hotelId: null
        }>(`/api/hotels/image?hotelId=${hotelId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    getDetailHotel: (hotelId: string) => {
        return http.get<DetailHotelResponse>(`hotel-management/hotels/detail?hotelId=${hotelId}`)
    },
    updateHotel: ({ hotelId, body }: { hotelId: string; body: HotelDetailFormValue & { facilities: number[] } }) => {
        return http.put(`/hotel-management/hotels?hotelId=${hotelId}`, body)
    },
    updateImage: ({ hotelId, formData }: { hotelId: number; formData: FormData }) => {
        return http.put(`hotel-management/hotels/image/${hotelId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }
}

export default hotelApi
