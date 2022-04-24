/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import axios, { AxiosRequestConfig } from 'axios';

export type ResponseTuple<T = any> = [boolean, T, string];

const returnData = (response: any) => {
    const { data = {} } = response || {};
    if (data && data?.errorCode === 0) {
        return [true, data?.data, ''] as ResponseTuple;
    }
    return [false, data?.data, data?.message || '网络异常，请稍后再试'] as ResponseTuple;
}

export default async function request<T>(config: AxiosRequestConfig): Promise<ResponseTuple<T>> {
    const token = localStorage.getItem('token');
    try {
        const response = await axios({
            ...config,
            baseURL: 'http://localhost:3000',
            headers: {
                'authorization': token ? `Bearer ${token}` : '',
            }
        });
    
        return returnData(response);
    } catch (e: any) {
        return returnData(e.response ?? {});
    }
    
}