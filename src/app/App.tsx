import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'shared/ui/Sidebar/Sidebar';
import { Suspense } from 'react';
import { AppRouter } from './providers/router';

function App() {
    return (
        <div id="app" className={classNames('app')}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
}

export default App;
