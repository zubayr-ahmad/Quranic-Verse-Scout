import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/home";
import Tafseer from "../pages/tafseer/tafseer";
import SurahSummary from "../pages/surah-summary/SurahSummary";
import VerseFinder from "../pages/verse-finder/VerseFinder";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/surah-summary" element={<SurahSummary />} />
      <Route path="/verse-finder" element={<VerseFinder />}>
        <Route path="tafseer/:surah_id/:verse_id" element={<Tafseer />} />
      </Route>
    </Route>
  )
);

export default router;
