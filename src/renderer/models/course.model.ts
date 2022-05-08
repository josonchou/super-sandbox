/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import message from '@renderer/components/message';
import { ResponseTuple } from '@renderer/lib/request';
import { getKeyFromKeyPath } from '@renderer/lib/util';
import { batchRemove, createCourse, cutFile, getAllSecondTrainingItems, getCourseList, mergeUploadSnippet } from '@renderer/service/course';
import { makeModal } from '@renderer/store';

const CourseModel = makeModal({
    name: 'course',
    initialState: {
        category: [],
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
        *refreshAllSecondCategory({ payload }, { put, call }) {
            const list = yield call(getAllSecondTrainingItems, payload);

            yield put({
                type: 'apply',
                payload: {
                    category: list,
                },
            });
        },
        *fetchCourseList({ payload = {} }, { put, call }) {
            const [isOk, result] = (yield call(getCourseList, payload ?? { page: 1 })) as unknown as ResponseTuple<any>;
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
        *removeCourse({ payload = {}, callback }, { call }) {
            const [isOk, _, msg] = (yield call(batchRemove, payload)) as unknown as ResponseTuple<any>;

            if (isOk) {
                message.success('删除成功');
                callback && callback();
                // yield put({
                //     type: 'fetchCourseList',
                //     payload: {
                //         page: course.currentPage,
                //         pageSize: 3,
                //     }
                // })
            } else {
                message.error(msg);
            }
        },
        *createOne({ payload = {}, callback }, { put, call, select }) {
            const destory = message.toast('正在上传文件', 0);
            const cutResult = (yield call(cutFile, (payload.file || [])[0])) as any;
            console.log(cutResult, 'cutResult');
            
            message.toast('文件已哈希', 0);
            const onProgress = (progress: number) => {
                message.toast(`文件已上传 ${progress}% `, 0);
            };
            const [isUploadSuccess, resp] = (yield call(mergeUploadSnippet, (payload.file || [])[0], onProgress)) as any;
            if (!isUploadSuccess) {
                message.error(resp?.message ?? '文件上传失败');
                destory();
                return;
            }
            message.toast('正在提交', 0);
            const categoryKey = getKeyFromKeyPath(payload.categoryKey ?? '')
            const { data = {} } = (resp || {}).data || {};
            const [isOk, _, msg] = (yield call(createCourse, {
                courseName: payload.courseName,
                fileUUID: data.uuid,
                categoryKey,
            })) as unknown as ResponseTuple<any>;
            const course = (yield select((s) => s.course)) as any;
            
            if (isOk) {
                
                message.toast('创建成功', 1000);
                callback && callback();
                
                yield put({
                    type: 'fetchCourseList',
                    payload: {
                        page: course.currentPage,
                        pageSize: 3,
                        categoryKey,
                    }
                });
            } else {
                destory();
                message.error(msg);
            }
        },
    },
});

export default CourseModel;
