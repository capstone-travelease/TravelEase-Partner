import { HotelResponse } from 'src/types/hotel.type'
import http from 'src/utils/http'

const hotelApi = {
    getHotelList: (userId: string) => {
        return http.get<HotelResponse>(`/partner/api/hotels?userId=${userId}`)
    }
}

export default hotelApi
