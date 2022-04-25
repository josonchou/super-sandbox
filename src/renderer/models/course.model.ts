/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import message from '@renderer/components/message';
import { getAllSecondTrainingItems } from '@renderer/constanst/training';
import { ResponseTuple } from '@renderer/lib/request';
import { batchRemove, createCourse, getCourseList } from '@renderer/service/course';
import { makeModal } from '@renderer/store';

const CourseModel = makeModal({
    name: 'course',
    initialState: {
        category: getAllSecondTrainingItems(),
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
            const account = (yield select((s) => s.account)) as any;
            const [isOk, _, msg] = (yield call(batchRemove, payload)) as unknown as ResponseTuple<any>;

            if (isOk) {
                message.tips('删除成功');
                yield put({
                    type: 'fetchCourseList',
                    payload: {
                        page: account.currentPage,
                        pageSize: 3,
                    }
                })
            } else {
                message.tips(msg);
            }
        },
        *createOne({ payload = {}, callback }, { put, call, select }) {
            const [isOk, _, msg] = (yield call(createCourse, payload)) as unknown as ResponseTuple<any>;
            const account = (yield select((s) => s.account)) as any;
            if (isOk) {
                message.tips('删除成功');
                callback && callback();
                yield put({
                    type: 'fetchCourseList',
                    payload: {
                        page: account.currentPage,
                        pageSize: 3,
                    }
                });
            } else {
                message.tips(msg);
            }
        }
    },
});

export default CourseModel;
