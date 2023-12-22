import { useRoutes } from 'react-router-dom'
import { ROUTES } from './constants/Routes'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import MainLayout from './layouts/MainLayout'
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
            path: ROUTES.HOME_MANAGEMENT,
            element: <MainLayout />
        },
        {
            path: `${ROUTES.DASHBOARD}/:id`,
            element: <DashBoard />
        }
    ])

    return element
}
