/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import { getAccounts } from '@renderer/service/account';
import { makeModal } from '@renderer/store';

const AccountModel = makeModal({
    name: 'account',
    initialState: {
        records: [],
        total: 0,
    },
    reducers: {
        apply(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        }
    },
    effects: {
        *fetchAccountList({ payload = {} }, { put, call }) {
            const result: any = yield call(getAccounts, payload ?? { page: 1 });
            console.log('result ==>', result);
            
            const { total, records } = result;

            yield put({
                type: 'apply',
                payload: {
                    records,
                    total,
                },
            });
        }
    },
});

export default AccountModel;
