import { RoomFormValues } from 'src/pages/AddRoom/AddRoom'
import { RoomListResponse, RoomType } from 'src/types/room.type'
import http from 'src/utils/http'

const roomApi = {
    addRoom: (body: RoomFormValues & { hotelId: number }) => {
        return http.post<{ code: number; message: string; roomId: number }>('/rooms', body)
    },
    getRoomType: () => {
        return http.get<{ code: number; message: string; list: RoomType[] }>('/rooms/types')
    },
    getRoomList: (hotelId: number) => {
        return http.get<RoomListResponse>(`/rooms?hotelId=${hotelId}`)
    }
}

export default roomApi
