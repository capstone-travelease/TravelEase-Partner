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

export type UpdateRoomFormValues = {
    roomId: number
    roomName: string
    roomStatus: boolean
    roomPrice: number
    roomType: number
    roomQuantity: number
    roomDescription: string
    roomSize: string
    roomBedQuantity: number
    roomCapacity: number
    facilities: number[]
}

export type RoomDetailResponse = {
    roomId: number
    roomName: string
    roomType: number
    roomStatus: boolean
    roomPrice: number
    roomQuantity: number
    roomDescription: string
    roomSize: string
    roomBedQuantity: number
    room_Capacity: number
    facilities: number[]
    imagePath: string[]
}
