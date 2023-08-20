import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import AboutIcon from '@/shared/assets/icons/about-20-20.svg';
import MainIcon from '@/shared/assets/icons/main-20-20.svg';
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg';
import ArticleIcon from '@/shared/assets/icons/article-20-20.svg';
import { SidebarItemType } from '../types/sidebarItem';
import { RoutePath } from '@/shared/consts/router';

export const getSidebarItems = createSelector(getUserAuthData, (userAuthData) => {
    const sidebarItemsList: SidebarItemType[] = [
        {
            path: RoutePath.main,
            textKey: 'MainLink',
            Icon: MainIcon,
        },
        {
            path: RoutePath.about,
            textKey: 'AboutLink',
            Icon: AboutIcon,
        },
    ];

    if (userAuthData) {
        sidebarItemsList.push(
            {
                path: RoutePath.profile + userAuthData.id,
                textKey: 'ProfileLink',
                Icon: ProfileIcon,
                authOnly: true,
            },
            {
                path: RoutePath.articles,
                textKey: 'ArticleLink',
                Icon: ArticleIcon,
                authOnly: true,
            },
        );
    }

    return sidebarItemsList;
});
