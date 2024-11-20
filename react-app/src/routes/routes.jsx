import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import App from '../App'
import Home from '../pages/home/home'
import Tafseer from '../pages/tafseer/tafseer'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route path='/' element={<Home />} />
            <Route path='tafseer/:surah_id/:verse_id' element={<Tafseer />} />
        </Route>
    )
)

export default router;