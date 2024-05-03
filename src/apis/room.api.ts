import { RoomFormValues } from 'src/pages/AddRoom/AddRoom'
import { RoomDetailResponse, RoomListResponse, RoomType } from 'src/types/room.type'
import http from 'src/utils/http'

const roomApi = {
    addRoom: (body: RoomFormValues & { hotelId: number }) => {
        return http.post<{ code: number; message: string; roomId: number }>('/room-management/rooms', body)
    },
    getRoomType: () => {
        return http.get<{ code: number; message: string; list: RoomType[] }>('/room-management/rooms/types')
    },
    getRoomList: (hotelId: number) => {
        return http.get<RoomListResponse>(`/room-management/rooms?hotelId=${hotelId}`)
    },
    getRoomDetail: (roomId: string) => {
        return http.get<{ code: number; message: string; data: RoomDetailResponse }>(
            `/room-management/rooms/detail/${roomId}`
        )
    }
}

export default roomApi
