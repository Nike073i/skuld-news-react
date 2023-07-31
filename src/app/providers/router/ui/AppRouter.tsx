import { Suspense, memo, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from 'widgets/PageLoader';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { routeConfig } from '../config/routeConfig';

const AppRouter = memo(() => {
    const isAuth = useSelector(getUserAuthData);
    const routes = useMemo(() => (
        Object.values(routeConfig)
            .filter((route) => !route.authOnly || isAuth)
    ), [isAuth]);
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {routes.map(({ element, path }) => (
                    <Route
                        key={path}
                        path={path}
                        element={(
                            <div className="page-wrapper">
                                {element}
                            </div>
                        )}
                    />
                ))}
            </Routes>
        </Suspense>
    );
});

export default AppRouter;
