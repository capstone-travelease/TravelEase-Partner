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

export type DetailHotelResponse = {
    code: number
    message: string
    data: {
        hotelId: number
        hotelName: string
        hotelAddress: string
        hotelCity: string
        hotelCountry: string
        hotelNumber: string
        hotelDescription: string
        hotelEmail: string
        hotelCheckIn: string
        hotelCheckOut: string
        hotelImage: string[]
        hotelFacility: number[]
    }
}
