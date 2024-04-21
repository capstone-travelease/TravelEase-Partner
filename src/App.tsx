import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useRouteElements from './useRouteElements'
import { localStorageEventTarget } from 'src/utils/auth'
import { useContext, useEffect } from 'react'
import { AppContext } from 'src/contexts/app.context'

function App() {
    const routeElements = useRouteElements()
    const { reset } = useContext(AppContext)

    useEffect(() => {
        localStorageEventTarget.addEventListener('clearLS', reset)
        return () => {
            localStorageEventTarget.removeEventListener('clearLS', reset)
        }
    }, [reset])

    return (
        <>
            {routeElements}
            <ToastContainer />
        </>
    )
}

export default App
