import { takeEvery, delay, call, select, put } from '@redux-saga/core/effects';
import { Action } from 'redux';
import { EffectsSet } from './data';

export function* watchEffect() {
    yield takeEvery('*', function* effect(action) {
        if (EffectsSet.has(action.type as string)) {
            const [actionPrefix = ''] = action.type.split('@');
            yield put({ type: 'global@LOADING', payload: action.type });
            const effectFn = EffectsSet.get(action.type);
            if (typeof effectFn === 'function') {
                yield effectFn(action as any, {
                    call,
                    select,
                    put: <A extends Action>(action: A) => {
                        const { type } = action;
                        if (!type.includes('@') && actionPrefix) {
                            const currentActionType = `${actionPrefix}@${type}`;
                            return put({
                                ...action,
                                type: currentActionType,
                            });
                        }
                        return put<A>(action);
                    },
                    delay,
                });
            }
            yield put({ type: 'global@LOADING_END', payload: action.type });
        }
    });
}
