/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import { shallowEqual, useSelector } from 'react-redux';
import { GlobalState } from './interface';
import { store } from './store';

export { default as makeModal } from './model';
export { default as StoreProvider } from './StoreProvider';

interface RootState {
    global: GlobalState;
}

interface LoadingState {
    loading?: GlobalState['loading'];
}

export function useLoading() {
    const { loading } = useSelector<RootState, LoadingState>(({ global = {} }) => ({
        loading: global.loading ?? {},
    }), shallowEqual);

    return loading ?? {};
}

export function useGlobalState() {
    const { global } = useSelector<RootState, RootState>(({ global = {}}) => ({
        global,
    }));

    return global ?? {};
}

export const dispatch = store.dispatch;