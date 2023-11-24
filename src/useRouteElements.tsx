import { useRoutes } from 'react-router-dom'
import { ROUTES } from './constants/Routes'
import DashBoard from './pages/DashBoard'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Register from './pages/Register'

export default function useRouteElements() {
    const element = useRoutes([
        {
            path: ROUTES.HOME,
            element: <DashBoard />
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
    ])

    return element
}
