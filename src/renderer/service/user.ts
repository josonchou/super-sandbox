/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import request from '@renderer/lib/request';
import { AnyParams } from './interface';

export async function login(params: AnyParams) {
    const [ok, data] = await request({
        url: '/guard/login/admin',
        method: 'post',
        data: params,
    });


    return [ok, data];
}

export async function getUserInfo() {
    return request({
        url: '/admin/userInfo',
        method: 'get',
    });
}
