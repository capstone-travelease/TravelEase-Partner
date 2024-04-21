export type HotelType = {
    hotelId: number
    hotelName: string
    hotelPhone: string
    hotelAddress: string
    statusId: number
    statusName: string
    urlPath: string[]
}

export type HotelResponse = {
    code: number
    message: string
    list: HotelType[]
}

export type AddHotelResponse = {
    code: number
    message: string
    hotelId: number
}
