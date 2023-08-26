import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { getUserInited, initAuthData } from '@/entities/User';
import { AppRouter } from './providers/router';
import { Sidebar } from '@/widgets/Sidebar';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from '@/widgets/PageLoader';

function App() {
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);
    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);
    if (!inited) {
        return <PageLoader />;
    }
    return (
        <div id="app" className={classNames('app')}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
}

export default App;
