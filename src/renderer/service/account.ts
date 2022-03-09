/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import { AnyParams, delay } from './interface';


const Accounts = [
    {
        rowId: 1,
        username: 'root',
        password: 'root',
        remark: '管理员',
    },
    {
        rowId: 2,
        username: 'user1',
        password: '666666',
        remark: '讲师',
    },
    {
        rowId: 3,
        username: 'user2',
        password: '666666',
        remark: '讲师',
    },
    {
        rowId: 4,
        username: 'user2',
        password: '666666',
        remark: '管理员',
    },
];

export async function getAccounts(params: AnyParams) {
    const { page, pageSize } = params;
    console.log(params, 'params');
    
    await delay(1000);
    const skip: number = (page - 1) * pageSize;
    
    
    const res = {
        records: Accounts.slice(skip, skip + pageSize),
        page,
        pageSize,
        total: Accounts.length,
    };

    console.log(Accounts, 'Accounts', res);

    return res;
}