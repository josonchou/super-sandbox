/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import message from '@renderer/components/message';
import { ResponseTuple } from '@renderer/lib/request';
import { batchRemove, createUser, getAccounts } from '@renderer/service/account';
import { makeModal } from '@renderer/store';

const AccountModel = makeModal({
    name: 'account',
    initialState: {
        records: [],
        total: 0,
        currentPage: 1,
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
            const [isOk, result] = (yield call(getAccounts, payload ?? { page: 1 })) as unknown as ResponseTuple<any>;
            if (isOk) {
                const { total, records, page } = result as any;
                console.log(result, 'result')
                yield put({
                    type: 'apply',
                    payload: {
                        records,
                        total,
                        currentPage: page,
                    },
                });
            }
        },
        *removeUsers({ payload = {} }, { put, call, select }) {
            const account = (yield select((s) => s.account)) as any;
            const [isOk, _, msg] = (yield call(batchRemove, payload)) as unknown as ResponseTuple<any>;

            if (isOk) {
                message.success('删除成功');
                yield put({
                    type: 'fetchAccountList',
                    payload: {
                        page: account.currentPage,
                        pageSize: 3,
                    }
                })
            } else {
                message.error(msg);
            }
        },
        *createOne({ payload = {}, callback }, { put, call, select }) {
            const [isOk, _, msg] = (yield call(createUser, payload)) as unknown as ResponseTuple<any>;
            const account = (yield select((s) => s.account)) as any;
            if (isOk) {
                message.success('删除成功');
                callback && callback();
                yield put({
                    type: 'fetchAccountList',
                    payload: {
                        page: account.currentPage,
                        pageSize: 3,
                    }
                });
            } else {
                message.error(msg);
            }
        }
    },
});

export default AccountModel;
