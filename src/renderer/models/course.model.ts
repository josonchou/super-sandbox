/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import message from '@renderer/components/message';
import { ResponseTuple } from '@renderer/lib/request';
import { getKeyFromKeyPath } from '@renderer/lib/util';
import { batchRemove, createCourse, getAllSecondTrainingItems, getCourseList, uploadFile } from '@renderer/service/course';
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
        *removeCourse({ payload = {} }, { put, call, select }) {
            const course = (yield select((s) => s.course)) as any;
            const [isOk, _, msg] = (yield call(batchRemove, payload)) as unknown as ResponseTuple<any>;

            if (isOk) {
                message.success('删除成功');
                yield put({
                    type: 'fetchCourseList',
                    payload: {
                        page: course.currentPage,
                        pageSize: 3,
                    }
                })
            } else {
                message.error(msg);
            }
        },
        *createOne({ payload = {}, callback }, { put, call, select }) {
            const destory = message.toast('正在上传文件', 0);
            const resp = (yield call(uploadFile, (payload.file || [])[0])) as any;
            message.toast('正在提交', 0);
            const { data = {} } = (resp || {}).data || {};
            const [isOk, _, msg] = (yield call(createCourse, {
                courseName: payload.courseName,
                fileUUID: data.uuid,
                categoryKey: getKeyFromKeyPath(payload.categoryKey ?? ''),
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
