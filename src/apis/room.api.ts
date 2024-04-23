import { RoomType } from 'src/types/room.type'
import http from 'src/utils/http'

type AddRoomType = {
    roomName: string
    roomPrice: number
    roomType: number
    hotelId: number
    roomQuantity: number
    roomDescription: string
    roomSize: string
    roomBedQuantity: number
    roomCapacity: number
    roomFacilites: number[]
}

const roomApi = {
    addRoom: (body: AddRoomType) => {
        return http.post('/rooms', body)
    },
    getRoomType: () => {
        return http.get<{ code: number; message: string; list: RoomType[] }>('/rooms/types')
    }
}

export default roomApi
