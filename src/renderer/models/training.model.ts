/*
 * @description: 
 * @author: 周金顺（云天河）
 */

// import { TrainingItem } from '@renderer/constanst/training';
import { makeModal } from '@renderer/store';
import pdf from '@assets/files/test.pdf';
import mp4 from '@assets/files/test.mp4';
import videocover from '@assets/videocover.jpeg';
import { getAllCourse, getCourseCategory } from '@renderer/service/course';
import { ResponseTuple } from '@renderer/lib/request';


const TrainingModel = makeModal({
    name: 'training',
    initialState: {
        courseCategory: [],
        selectedMasterCate: 1,
        secondMenu: [],
        secondTitle: '',
        secondMenuKey: 0,
        thirdMenu: [],
        thirdMenuTitle: '',
        thirdMenuKey: 0,
        currentStudyCategory: [],
        courseList: [],
        currentCourse: {},
    },
    effects: {
        *loadCategory(_, { call, put }) {
            const [isOk, category] = (yield call(getCourseCategory)) as unknown as ResponseTuple<{ trainingCategory: Array<any>}>;

            if (isOk) {
                yield put({
                    type: 'apply',
                    payload: {
                        courseCategory: category.trainingCategory ?? [],
                        secondMenu: ((category.trainingCategory ?? [])[0] ?? {})?.children ?? [],
                    }
                })
            } else {
                yield put({
                    type: 'apply',
                    payload: {
                        courseCategory: [],
                        secondMenu: [],
                    }
                })
            }
        },
        *startStudy({ payload }, { put, select }) {
            yield put({ type: 'loadCategory' })
            const { secCate } = (payload ?? {}) as any;
            const { selectedMasterCate, courseCategory } = (yield select((s) => s.training ?? {})) as any;
            const foundMasterCategory = (courseCategory ?? []).find((item: any) => item.key === +selectedMasterCate);
            
            const found = (foundMasterCategory?.children ?? []).find((item: any) => item.key === +secCate);

            yield put({
                type: 'apply',
                payload: {
                    currentStudyCategory: found?.children ?? [],
                    secondTitle: `${found?.name} (${found?.code})`,
                    secondMenuKey: found?.key,
                },
            })
        },
        *loadCourse({ payload }, { call, put }) {
            const [isOk, courseList] = (yield call(getAllCourse, { categoryKey: payload })) as unknown as ResponseTuple<Array<any>>;
            if (isOk) {
                yield put({
                    type: 'apply',
                    payload: {
                        courseList,
                    }
                })
            } else {
                yield put({
                    type: 'apply',
                    payload: {
                        courseList: [],
                    }
                })
            }
        },
        *getSecondMenuById({ payload }, { put, select }) {
            const { courseCategory } = (yield select((s) => s.training ?? {})) as any;
            const found = (courseCategory ?? []).find((item: any) => item.key === +payload);
            yield put({
                type: 'apply',
                payload: {
                    secondMenu: found?.children ?? [],
                },
            });
        },
        *getThirdMenuBySecondId({ payload }, { put, select }) {
            const { selectedMasterCate, courseCategory } = (yield select((s) => s.training ?? {})) as any;
            const foundMasterCategory = (courseCategory ?? []).find((item: any) => item.key === +selectedMasterCate);
            
            const found = (foundMasterCategory?.children ?? []).find((item: any) => item.key === +payload);
            yield put({
                type: 'apply',
                payload: {
                    thirdMenu: found?.children ?? [],
                    secondTitle: `${found?.name} (${found?.code})`,
                    secondMenuKey: found?.key,
                },
            });

        }
    },
    reducers: {
        apply(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
        setMasterCate(state, { payload }) {
            return {
                ...state,
                selectedMasterCate: payload,
            };
        },
    },
});

export default TrainingModel;
