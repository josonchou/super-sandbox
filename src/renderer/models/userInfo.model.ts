/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import { ResponseTuple } from '@renderer/lib/request';
import { AdminDTO, LoginResult, UserInfoDTO } from '@renderer/schema/admin';
import { getUserInfo, login } from '@renderer/service/user';
import { makeModal } from '@renderer/store';

interface UserInfo {
    uid?: number;
    userName?: string;
    token?: string;
    role?: number;
    ability?: any;
    trainingCategory?: any;
}

const UserInfoModel = makeModal<UserInfo>({
    name: 'userInfo',
    initialState: {
        uid: 0,
        token: '',
        ability: [],
        trainingCategory: [],
    },
    effects: {
        *login({ payload, callback }, ctx) {
            const { username, password, navigate } = payload;

            const [isOk, data] = (yield ctx.call(login, {
                username,
                password,
            })) as unknown as ResponseTuple<LoginResult>;

            if (isOk) {
                console.log(data, 'data==>')
                yield ctx.put({
                    type: 'apply',
                    payload: {
                        uid: data.admin?.id,
                        userName: data.admin?.nickname,
                        role: data.admin?.role,
                        token: data.token,
                    }
                });
                localStorage.setItem('token', data.token);
                // Token 7天后过期
                const tokenExpireAt = Date.now() + (7 * 24 * 3600 * 1000);
                localStorage.setItem('token_expire_at', String(tokenExpireAt));
                navigate('/');
            } else {
                callback(new Error('登录失败'));
            }
        },
        *logout({ payload }, { put }) {
            yield put({ type: 'apply', payload: { uid: 0, token: '' }});
            localStorage.setItem('token', '');
            const { navigate } = payload;
            navigate('/login');
        },
        *refreshUserInfo(_, { put, call }) {
            const token = localStorage.getItem('token');
            const [isOk, userInfo] = (yield call(getUserInfo)) as unknown as ResponseTuple<UserInfoDTO>;
            const { admin, ability, trainingCategory } = userInfo ?? {};
            console.log(userInfo, 'userInfo ==>');
            if (isOk) {
                yield put({
                    type: 'apply',
                    payload: {
                        uid: admin?.id,
                        userName: admin?.nickname,
                        role: admin?.role,
                        token,
                        ability,
                        trainingCategory
                    }
                });
            }
        },
        *initLoginState({ callback }, { put, select }) {
            const userInfo = (yield select((s) => s.userInfo)) as any;
            const token = localStorage.getItem('token');
            const tokenExpireAt = +(localStorage.getItem('token_expire_at') ?? 0);

            if (token && Date.now() > tokenExpireAt) {
                // need login
                callback({ needLogin: true });
                return;
            }
            
            if (userInfo.token !== token) {
                yield put({ type: 'refreshUserInfo' });
                callback({ needLogin: false });
            }
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
