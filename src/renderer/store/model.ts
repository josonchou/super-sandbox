/*
 * @description: 
 * @author: 周金顺（云天河）
 */
import { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import { EffectsSet, Models } from './data';
import { ReducerAction, Model, DispatchAction } from './interface';
import { globalReducers, store, saga } from './store';

interface ReducersMap {
    [key: string]: (state: any, action: ReducerAction) => void;
}

export function updateModels() {
    const combine: any = {
        global: globalReducers,
    };
    Models.forEach((config, key) => {
        combine[key] = config.reducer;
    });
    const nextReducer = combineReducers(combine);
    store.replaceReducer(nextReducer as any);
}

function makeModal<S>(model: Model<S>) {
    const { name, initialState = {}, reducers = {}, effects = {}, } =  model;
    if (!Models.has(name)) {
        // Reflect.getOwnPropertyDescriptor()
        // Object.keys(reducers).for
        const reducersMap: ReducersMap = {
            'INIT': () => {
                return initialState;
            },
        };
        Reflect.ownKeys(reducers ?? {}).forEach((key) => {
            const fn = (reducers ?? {})[key as string];
            if (typeof fn === 'function') {
                reducersMap[`${name}@${key as string}`] = (state: any, action: ReducerAction) => {
                    return fn(state as S, action, {});
                };
            }
        });

        // 设置 Effects 方法
        Reflect.ownKeys(effects).forEach((key) => {
            EffectsSet.set(`${name}@${key as string}`, effects[key as string]);
        });
        Models.set(name, {
            reducersMap,
            reducer: (state = initialState, action = {}) => {
                const { type = '', ...otherParams } = action;
                if (reducersMap[type]) {
                    const nextState: any = reducersMap[type](state, otherParams);
                    return nextState ?? state;
                }

                return state;
            },
        });
        updateModels();
    }

    const dispatch = (action: DispatchAction) => {
        // saga.run()
        if (Reflect.has(reducers ?? {}, action.type)) {
            return store.dispatch({
                ...action,
                type: `${name}@${action.type}`,
            });
        }
        return store.dispatch(action);
    }

    function useModel(): [S, (action: DispatchAction) => DispatchAction] {
        const modelState: S = useSelector((state: any) => state[name], shallowEqual);
        return [modelState, dispatch];
    }

    return {
        useModel,
        dispatch,
    };
}

export default makeModal;
