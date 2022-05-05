import { useMemo, useRef } from 'react';

/*
 * @description:
 * @author: 周金顺（云天河）
 */
type Fn = (this: any, ...args: any[]) => any;

type PickFunction<T extends Fn> = (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T>;

export default function useMemoFn<T extends Fn>(fn: T) {
    const fnRef = useRef<T>(fn);
    fnRef.current = useMemo(() => fn, [fn]);

    const memoizedFn = useRef<PickFunction<T>>();
    if (!memoizedFn.current) {
        memoizedFn.current = function(...args) {
            return fnRef.current(...args);
        };
    }

    return memoizedFn.current;
}
