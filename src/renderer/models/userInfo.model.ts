/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import { makeModal } from '@renderer/store';

interface UserInfo {
    uid?: number;
    userName?: string;
}

const UserInfoModel = makeModal<UserInfo>({
    name: 'userInfo',
    initialState: {
        uid: 0,
    },
    effects: {
        *login({ payload }, ctx) {
            const { username, password, navigate } = payload;
            yield ctx.delay(1000);
            if (username === 'root' && password === '123') {
                yield ctx.put({
                    type: 'apply',
                    payload: {
                        uid: 1,
                        userName: 'root',
                    },
                });
                navigate('/');
            }
            console.log('Login UserInfo ==>');
            
        },
        *logout({ payload }) {
            const { navigate } = payload;
            navigate('/login');
        }
    },
    reducers: {
        apply: (state, { payload }) => {
            return {
                ...state,
                ...payload,
            };
        },
    },
});

export default UserInfoModel;
