import { classNames } from 'shared/lib/classNames/classNames';
import {
    FC, MutableRefObject, PropsWithChildren, useRef, UIEvent,
} from 'react';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useLocation } from 'react-router-dom';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';
import { useInitialEffect } from 'shared/lib/hooks/useInitalEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { PAGE_ID } from 'shared/consts/documentIds';
import { getPageScrollByPath } from '../ScrollSave/model/selectors/getPageScrollByPath/getPageScrollByPath';
import { pageScrollActions } from '../ScrollSave/model/slices/pageScrollSlice';
import cls from './Page.module.scss';

interface PageProps extends PropsWithChildren {
    className?: string;
    onScrollEnd?: () => void;
}

export const Page: FC<PropsWithChildren<PageProps>> = (props: PropsWithChildren<PageProps>) => {
    const {
        className,
        children,
        onScrollEnd,
    } = props;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const containerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const scrollPosition = useSelector((state: StateSchema) => getPageScrollByPath(state, pathname));
    const mods = {};

    useInfiniteScroll({
        containerRef,
        triggerRef,
        callback: onScrollEnd,
    });

    useInitialEffect(() => {
        containerRef.current.scrollTop = scrollPosition;
    });

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(pageScrollActions.setScrollPosition({
            position: e.currentTarget.scrollTop,
            path: pathname,
        }));
    }, 500);
    return (
        <section
            ref={containerRef}
            className={classNames(cls.pageWrapper, mods, [className])}
            onScroll={onScroll}
            id={PAGE_ID}
        >
            {children}
            {onScrollEnd && <div ref={triggerRef} className={cls.trigger} />}
        </section>
    );
};
