import { getUserAuthData } from 'entities/User';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { FC, PropsWithChildren } from 'react';
import { RoutePath } from '../config/routeConfig';

interface RequireAuthProps {
    redirectUrl?: string;
}
export const RequireAuth: FC<PropsWithChildren<RequireAuthProps>> = (props: PropsWithChildren<RequireAuthProps>) => {
    const {
        children,
        redirectUrl = RoutePath.main,
    } = props;
    const auth = useSelector(getUserAuthData);
    const location = useLocation();

    if (!auth) {
        return <Navigate to={redirectUrl} state={{ from: location }} replace />;
    }
    return children;
};
