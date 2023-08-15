import { createSelector } from '@reduxjs/toolkit';
import { UserRole } from '../../../types/user';
import { getUserRoles } from '../getUserRoles/getUserRoles';

export const isUserAdmin = createSelector(
    getUserRoles,
    (roles?: UserRole[]) => Boolean(roles?.includes(UserRole.ADMIN)),
);
