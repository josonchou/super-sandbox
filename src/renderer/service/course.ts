import request, { remote } from '@renderer/lib/request';
import { CreateUserDTO } from '@renderer/schema/admin';
import { CourseListResult } from '@renderer/schema/course';
import axios from 'axios';
import { AnyParams } from './interface';

export async function getCourseList(params: AnyParams) {
    const [isOk, result] = await request<CourseListResult>({
        url: '/courses/list',
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
        url: '/courses/batch',
        method: 'delete',
        data: {
            ids,
        }
    });
}

export async function createCourse(data: any) {
    return await request({
        url: '/courses/createOne',
        method: 'post',
        data,
    });
}

export async function getAbilityTable() {
    return await request({
        url: '/courses/ability/category',
        method: 'get',
    });
}

export async function getCourseCategory() {
    return await request({
        url: '/courses/training/category',
        method: 'get',
    });
}

export async function getAllCourse(params: AnyParams) {
    return await request({
        url: '/courses/listByCategory',
        method: 'get',
        params,
    });
}

export async function uploadFile(file: any) {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await remote({
            url: '/files/upload',
            method: 'post',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response, 'Upload==>');
        return [true, response];
    } catch (e) {
        return [false, e];
    }
}

export async function getAllSecondTrainingItems(keywords: string) {
    const [isOk, data] = await request({
        url: '/courses/training/second/category',
        method: 'get',
        params: {
            keywords,
        }
    });

    if (isOk) {
        return data ??[];
    }

    return [];
}