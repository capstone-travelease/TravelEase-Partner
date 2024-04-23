export type RoomType = {
    room_type_id: number
    room_type_name: string
}

export type RoomListResponse = {
    code: number
    list: {
        roomId: number
        roomName: string
        roomPrice: number
        status: boolean
        roomQuantity: number
        roomType: string
        imageUrl: string[]
    }[]
    total: number
    message: string
}
