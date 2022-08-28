import { filehash } from '@renderer/lib/filehash';
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

export async function uploadSnippet(fileChunk: any, hash: string, index: number) {
    try {
        const formData = new FormData();
        formData.append('file', fileChunk);
        formData.append('hash', hash);
        formData.append('index', String(index));

        const response = await remote({
            url: '/files/snippet/upload',
            method: 'post',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return [true, response];
    } catch (e) {
        return [false, e];
    }
}

export async function cutFile(file: any) {
    const chunks = [];
    const boldSlice = File.prototype.slice;
    const chunkSize = 2 * 1024 * 1024;
    const chunkNums = Math.ceil(file.size / chunkSize);
    const hash = await filehash(file);
    let startIndex = 0;
    let endIndex = 0;

    for (let i = 0; i < chunkNums; i++) {
        startIndex = i * chunkSize;
        endIndex = startIndex + chunkSize;

        if (endIndex > file.size) {
            endIndex = file.size;
        }

        const contentItem = boldSlice.call(file, startIndex, endIndex);

        chunks.push({
            index: i,
            hash,
            total: chunkNums,
            originFilename: file.name,
            size: file.size,
            chunk: contentItem,
        });
    }

    return {
        chunks,
        fileInfo: {
            hash,
            total: chunkNums,
            name: file.name,
            size: file.size,
        }
    };
}

export async function mergeSnippet(hash: string, total: number, originFilename: string) {
    const response = await remote({
        url: '/files/snippet/merge',
        method: 'post',
        data: {
            hash,
            total,
            originFilename,
        },
    });

    return response;
}


export async function mergeUploadSnippet(file: any, onProgress?: (progress: number) => void) {
    const handleProgress = (p: number) => {
        if (onProgress) {
            onProgress(p);
        }
    };
    try {
        const cutFileInfo = await cutFile(file);
        handleProgress(10);
        const { chunks, fileInfo } = cutFileInfo ?? {};
        const { hash, total, name } = fileInfo;
        
        for (let i = 0; i < total; i++) {
            const chunkItem = chunks[i];
            await uploadSnippet(chunkItem.chunk, hash, chunkItem.index);
            const progress = 10 + Math.ceil((i + 1) / total * 90);
            handleProgress(progress > 100 ? 100 : progress);
        }

        console.log(name, 'upload ==> name')
        const resp = await mergeSnippet(
            hash,
            total,
            name,
        );
        return [true, resp];
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

export async function editCategory(params: any) {
    const [isOk, data] = await request({
        url: '/category/edit',
        method: 'post',
        data: params,
    });

    if (isOk) {
        return data;
    }

    return false;
}