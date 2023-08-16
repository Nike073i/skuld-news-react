import { createSelector } from '@reduxjs/toolkit';
import { UserRole } from '../../../../model/consts/consts';
import { getUserRoles } from '../getUserRoles/getUserRoles';

export const isUserManager = createSelector(
    getUserRoles,
    (roles?: UserRole[]) => Boolean(roles?.includes(UserRole.MANAGER)),
);
