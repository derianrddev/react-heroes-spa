import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "../../ui";
import { DCPage, HeroPage, MarvelPage, SearchPage } from "../pages";

export const HeroesRoutes = () => {

  const { pathname, search } = useLocation();
  
  const lastPath = pathname + search;
  localStorage.setItem('lastPath', lastPath);

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="marvel" element={<MarvelPage />} />
          <Route path="dc" element={<DCPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="hero/:heroId" element={<HeroPage />} />
          <Route path="/" element={<Navigate to="/marvel" />} />
          <Route path="/*" element={<Navigate to="/marvel" />} />
        </Routes>
      </div>
    </>
  )
}
