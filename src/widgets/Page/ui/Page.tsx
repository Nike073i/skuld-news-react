import {
    FC,
    MutableRefObject,
    PropsWithChildren,
    useRef,
    UIEvent,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { useInitialEffect } from '@/shared/lib/hooks/useInitalEffect/useInitialEffect';
import { StateSchema } from '@/app/providers/StoreProvider';
import { PAGE_ID } from '@/shared/consts/documentIds';
import { getPageScrollByPath } from '../ScrollSave/model/selectors/getPageScrollByPath/getPageScrollByPath';
import { pageScrollActions } from '../ScrollSave/model/slices/pageScrollSlice';
import cls from './Page.module.scss';
import { TestProps } from '@/shared/types/tests';
import { toggleFeatures } from '@/shared/lib/features';

interface PageProps extends PropsWithChildren, TestProps {
    className?: string;
    onScrollEnd?: () => void;
}

export const Page: FC<PropsWithChildren<PageProps>> = (
    props: PropsWithChildren<PageProps>,
) => {
    const {
        className,
        children,
        onScrollEnd,
        'data-testid': dateTestId = 'Page',
    } = props;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const containerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const scrollPosition = useSelector((state: StateSchema) =>
        getPageScrollByPath(state, pathname),
    );
    const mods = {};

    useInfiniteScroll({
        containerRef: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => undefined,
            off: () => containerRef,
        }),
        triggerRef,
        callback: onScrollEnd,
    });

    useInitialEffect(() => {
        containerRef.current.scrollTop = scrollPosition;
    });

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(
            pageScrollActions.setScrollPosition({
                position: e.currentTarget.scrollTop,
                path: pathname,
            }),
        );
    }, 500);

    const pageWrapper = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.pageWrapperRedesigned,
        off: () => cls.pageWrapper,
    });

    return (
        <main
            ref={containerRef}
            className={classNames(pageWrapper, mods, [className])}
            onScroll={onScroll}
            id={PAGE_ID}
            data-testid={dateTestId}
        >
            {children}
            {onScrollEnd && <div ref={triggerRef} className={cls.trigger} />}
        </main>
    );
};
