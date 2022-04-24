import request from '@renderer/lib/request';
import { AnyParams } from './interface';

export async function getCourseList(params: AnyParams) {
    const [isOk, result] = await request<AdminListResult>({
        url: '/admin/users',
        method: 'get',
        params,
    });

    if (isOk) {

        console.log(result, 'accountResul=>')
        return [isOk, {
            records: result?.list,
            page: result?.page,
            pageSize: result?.pageSize,
            total: result?.total,
        }];
    }
    return [isOk, {
        records: [],
    }]
}

export async function batchRemove(ids: number[]) {
    return await request({
        url: '/admin/users',
        method: 'delete',
        data: {
            uids: ids,
        }
    });
}

export async function createUser(data: CreateUserDTO) {
    return await request({
        url: '/admin/users',
        method: 'post',
        data,
    });
}