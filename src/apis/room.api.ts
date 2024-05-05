import { AddRoomFormValues } from 'src/pages/AddRoom/AddRoom'
import { RoomDetailResponse, RoomListResponse, RoomType, UpdateRoomFormValues } from 'src/types/room.type'
import http from 'src/utils/http'

const roomApi = {
    addRoom: (body: Omit<AddRoomFormValues, 'roomPhoto'> & { hotelId: number }) => {
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
    },
    updateRoom: (body: UpdateRoomFormValues) => {
        return http.put<{ code: number; message: string }>(`/room-management/rooms`, body)
    },
    uploadRoomImage: ({ roomId, formData }: { roomId: string | number; formData: FormData }) => {
        return http.post<{ code: number; message: string; url: string }>(
            `/room-management/rooms/images?roomId=${roomId}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
    },
    updateRoomImage: ({ roomId, formData }: { roomId: string | number; formData: FormData }) => {
        return http.put<{ code: number; message: string; url: string }>(
            `room-management/rooms/image/${roomId}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
    }
}

export default roomApi
