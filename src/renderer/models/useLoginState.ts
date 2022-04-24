/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import UserInfoModel from './userInfo.model';

export default function useLoginState() {
    const dispatch = UserInfoModel.useModel()[1];
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log(location);
        dispatch({
            type: 'userInfo@initLoginState',
            callback: (res: any) => {
                if (res.needLogin) {
                    if (!location.pathname.includes('/login')) {
                        navigate('/login');
                    }
                } else {
                    if (location.pathname.includes('/login')) {
                        navigate('/');
                    }
                }
            }
        });
    }, [navigate, dispatch]);

    return null;
}
