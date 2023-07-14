import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import AboutPageAsync from "./pages/AboutPage/AboutPage.async";
import MainPageAsync from "./pages/MainPage/MainPage.async";
import { Suspense } from "react";
import { useTheme } from "./theme/useTheme";
import { classNames } from "./helpers/classNames/classNames";

function App() {
    const { theme, toggleTheme } = useTheme()
    return (
        <div className={classNames('app', {}, [theme])}>
            <button onClick={toggleTheme}>TOGGLE</button>
            <Link to='/'>Главная</Link>
            <Link to='/about'>О сайте</Link>
            <Suspense fallback={<div>Loading</div>}>
                <Routes>
                    <Route path={'/about'} element={<AboutPageAsync />} />
                    <Route path={'/'} element={<MainPageAsync />} />
                </Routes>
            </Suspense>
        </div>
    )
}

export default App;