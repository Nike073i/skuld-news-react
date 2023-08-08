import { classNames } from 'shared/lib/classNames/classNames';
import {
    FC, MutableRefObject, PropsWithChildren, useRef,
} from 'react';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
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
    const mods = {};
    const containerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    useInfiniteScroll({
        containerRef,
        triggerRef,
        callback: onScrollEnd,
    });
    return (
        <section
            ref={containerRef}
            className={classNames(cls.pageWrapper, mods, [className])}
        >
            {children}
            <div ref={triggerRef} />
        </section>
    );
};
