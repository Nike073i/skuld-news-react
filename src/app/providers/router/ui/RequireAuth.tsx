import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { FC, PropsWithChildren, useMemo } from 'react';
import { UserRole, getUserAuthData, getUserRoles } from '@/entities/User';
import { getRouteForbidden, getRouteMain } from '@/shared/consts/router';

interface RequireAuthProps {
    roles?: UserRole[];
}
export const RequireAuth: FC<PropsWithChildren<RequireAuthProps>> = (
    props: PropsWithChildren<RequireAuthProps>,
) => {
    const { children, roles } = props;

    const auth = useSelector(getUserAuthData);
    const userRoles = useSelector(getUserRoles);
    const location = useLocation();

    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true;
        }
        return roles?.some((requiredRole) => userRoles?.includes(requiredRole));
    }, [roles, userRoles]);

    if (!auth) {
        return (
            <Navigate to={getRouteMain()} state={{ from: location }} replace />
        );
    }

    if (!hasRequiredRoles) {
        return (
            <Navigate
                to={getRouteForbidden()}
                state={{ from: location }}
                replace
            />
        );
    }
    return children;
};
