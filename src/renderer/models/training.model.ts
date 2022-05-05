/*
 * @description: 
 * @author: 周金顺（云天河）
 */

// import { TrainingItem } from '@renderer/constanst/training';
import { makeModal } from '@renderer/store';
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
        expendedKeys: [],
        selectedKey: '',
    },
    effects: {
        *loadCategory({ payload }, { call, put }) {
            const { sg = Date.now() } = payload ?? {};
            const [isOk, category] = (yield call(getCourseCategory)) as unknown as ResponseTuple<{ trainingCategory: Array<any>}>;
            
            if (isOk) {
                yield put({
                    type: 'apply',
                    payload: {
                        courseCategory: category.trainingCategory ?? [],
                        secondMenu: ((category.trainingCategory ?? [])[0] ?? {})?.children ?? [],
                    }
                });
            } else {
                yield put({
                    type: 'apply',
                    payload: {
                        courseCategory: [],
                        secondMenu: [],
                    }
                });
            }

            yield put({
                type: 'loadCategoryEnd',
                payload: sg,
            });
        },
        *startStudy({ payload }, { put, select, take }) {
            const ping = Date.now();
            yield put({ type: 'loadCategory', payload: { sg: ping } });
            const { payload: pong } = (yield take('training@loadCategoryEnd') ?? {}) as any;
            if (ping !== pong) {
                return;
            }
            
            const { secCate, thirdCate } = (payload ?? {}) as any;
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
            });

            yield put({
                type: 'apply',
                payload: {
                    courseList: [],
                }
            });

            if (found && found?.children && found?.children?.length) {
                const foundThirdCategory = found?.children?.find((item: any) => {
                    return String(item.key) === String(thirdCate);
                }) ?? {};

                const firstOfThirdCategoryChildren = (foundThirdCategory?.children ?? [])[0] ?? {};
                if (foundThirdCategory && foundThirdCategory?.key) {
                    yield put({
                        type: 'onExpended',
                        payload: [foundThirdCategory.key],
                    });
                }
                
                if (firstOfThirdCategoryChildren && firstOfThirdCategoryChildren?.key) {
                    yield put({
                        type: 'handleSelected',
                        payload: `${foundThirdCategory?.key}-${firstOfThirdCategoryChildren?.key}`,
                    });
                }
            }
        },
        *loadCourse({ payload }, { call, put }) {
            const [isOk, courseList] = (yield call(getAllCourse, { categoryKey: payload })) as unknown as ResponseTuple<Array<any>>;
            if (isOk) {
                yield put({
                    type: 'apply',
                    payload: {
                        courseList,
                        currentCourse: courseList && courseList?.length ? courseList[0] : {},
                    }
                });
            } else {
                yield put({
                    type: 'apply',
                    payload: {
                        courseList: [],
                        currentCourse: {},
                    }
                });
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

        },
        *onExpended({ payload }, { put }) {
            console.log('debug ==> onExpended', payload);
            
            yield put({
                type: 'apply',
                payload: {
                    expendedKeys: payload ?? [],
                },
            });
        },
        *handleSelected({ payload }, { put, select }) {
            yield put({
                type: 'apply',
                payload: {
                    selectedKey: payload ?? '',
                },
            });
            
            const keyArr = String(payload ?? '').split('-');
            yield put({
                type: 'loadCourse',
                payload: keyArr[(keyArr.length ?? 1) - 1],
            });

            const expendedKeys = yield select((s) => s?.training?.expendedKeys ?? []);
            yield put({
                type: 'apply',
                payload: {
                    expendedKeys,
                }
            });
        },
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
