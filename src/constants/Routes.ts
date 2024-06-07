export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot',
    HOTEL: '/hotel',
    DASHBOARD: '/dashboard',
    CREATE_HOTEL: '/create-hotel',
    ADD_ROOM: '/hotel/:hotelId/add-room',
    HOTEL_OVERVIEW: '/hotel/:hotelId/overview',
    HOTEL_DETAIL: '/hotel/:hotelId/hotel-detail',
    ROOM_MANAGEMENT: '/hotel/:hotelId/room-management',
    BOOKING_MANAGEMENT: '/hotel/:hotelId/booking-management',
    EDIT_ROOM: '/hotel/:hotelId/edit-room/:roomId',
    BOOKING_DETAIL: '/hotel/:hotelId/booking-detail/:bookingId'
} as const
