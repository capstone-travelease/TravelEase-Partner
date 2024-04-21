import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { ROUTES } from './constants/Routes'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateHotelLayout from './pages/CreateHotel/layouts/CreateHotelLayout'
import HotelManagementLayout from './layouts/HotelManagementLayout'
import DashBoardLayout from './layouts/DashBoardLayout'
import DashBoard from './pages/DashBoard'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'

const ProtectedRoutes = () => {
    const { isAuthenticated } = useContext(AppContext)
    return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />
}

const RejectedRoutes = () => {
    const { isAuthenticated } = useContext(AppContext)
    return isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} /> : <Outlet />
}

export default function useRouteElements() {
    const element = useRoutes([
        {
            path: ROUTES.HOME,
            element: <RejectedRoutes />,
            children: [
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
                }
            ]
        },
        {
            path: ROUTES.HOME,
            element: <ProtectedRoutes />,
            children: [
                {
                    path: ROUTES.HOME,
                    element: (
                        <DashBoardLayout>
                            <DashBoard />
                        </DashBoardLayout>
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
                    path: `${ROUTES.HOTEL}/:hotelId`,
                    element: <HotelManagementLayout />
                }
            ]
        }
    ])

    return element
}
