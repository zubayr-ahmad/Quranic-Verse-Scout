import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import App from '../App'
import Home from '../pages/home/home'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='' element={<App />}>
            <Route path='' element={<Home />} />
        </Route>
    )
)

export default router;