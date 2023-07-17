import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from 'widgets/PageLoader';
import { routeConfig } from '../config/routeConfig';

function AppRouter() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {Object.values(routeConfig)
                    .map(({ element, path }) => (
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
}

export default AppRouter;
