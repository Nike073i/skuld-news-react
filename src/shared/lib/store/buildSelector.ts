import { useSelector } from 'react-redux';
// eslint-disable-next-line ulbi-tv-plugin/layer-imports
import { StateSchema } from '@/app/providers/StoreProvider';

type Selector<T, TArgs extends any[]> = (
    state: StateSchema,
    ...args: TArgs
) => T;
type Hook<T, TArgs extends any[]> = (...args: TArgs) => T;
type Result<T, TArgs extends any[]> = [Hook<T, TArgs>, Selector<T, TArgs>];

export function buildSelector<T, TArgs extends any[]>(
    selector: Selector<T, TArgs>,
): Result<T, TArgs> {
    const useSelectorHook: Hook<T, TArgs> = (...args: TArgs) =>
        useSelector((state: StateSchema) => selector(state, ...args));
    return [useSelectorHook, selector];
}
