import { useRoutes } from 'react-router-dom'
import { ROUTES } from './constants/Routes'
import DashBoard from './pages/DashBoard'
import Login from './pages/Login'

export default function useRouteElements() {
    const element = useRoutes([
        {
            path: ROUTES.HOME,
            element: <DashBoard />
        },
        {
            path: ROUTES.LOGIN,
            element: <Login />
        }
    ])

    return { element }
}
