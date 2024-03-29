import { useRoutes } from 'react-router-dom'
import { ROUTES } from './constants/Routes'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateHotelLayout from './pages/CreateHotel/layouts/CreateHotelLayout'
import HotelManagementLayout from './layouts/HotelManagementLayout'
import DashBoardLayout from './layouts/DashBoardLayout'
import DashBoard from './pages/DashBoard'

export default function useRouteElements() {
    const element = useRoutes([
        {
            path: ROUTES.HOME,
            element: (
                <AuthLayout>
                    <Login />
                </AuthLayout>
            )
        },
        {
            path: ROUTES.LOGIN,
            element: (
                <AuthLayout>
                    <Login />
                </AuthLayout>
            )
        },
        {
            path: ROUTES.REGISTER,
            element: (
                <AuthLayout>
                    <Register />
                </AuthLayout>
            )
        },
        {
            path: ROUTES.CREATE_HOTEL,
            element: <CreateHotelLayout />
        },
        {
            path: ROUTES.DASHBOARD,
            element: (
                <DashBoardLayout>
                    <DashBoard />
                </DashBoardLayout>
            )
        },
        {
            path: `${ROUTES.HOTEL}/:id`,
            element: <HotelManagementLayout />
        }
    ])

    return element
}
