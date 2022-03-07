/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import { TrainingItem } from '@renderer/constanst/training';
import { makeModal } from '@renderer/store';


const TrainingModel = makeModal({
    name: 'training',
    initialState: {
        selectedMasterCate: 1,
        secondMenu: TrainingItem[0].children,
        secondTitle: '',
        secondMenuKey: 0,
        thirdMenu: [],
        thirdMenuTitle: '',
        thirdMenuKey: 0,
        currentStudyCategory: [],
    },
    effects: {
        *startStudy({ payload }, { put, select }) {
            const { secCate } = (payload ?? {}) as any;
            const { selectedMasterCate } = (yield select((s) => s.training ?? {})) as any;
            const foundMasterCategory = TrainingItem.find((item) => item.key === +selectedMasterCate);
            
            const found = (foundMasterCategory?.children ?? []).find((item) => item.key === +secCate);

            yield put({
                type: 'apply',
                payload: {
                    currentStudyCategory: found?.children ?? [],
                    secondTitle: `${found?.name} (${found?.code})`,
                    secondMenuKey: found?.key,
                },
            })
        },
        *getSecondMenuById({ payload }, { put }) {
            const found = TrainingItem.find((item) => item.key === +payload);
            yield put({
                type: 'apply',
                payload: {
                    secondMenu: found?.children ?? [],
                },
            });
        },
        *getThirdMenuBySecondId({ payload }, { put, select }) {
            const { selectedMasterCate } = (yield select((s) => s.training ?? {})) as any;
            const foundMasterCategory = TrainingItem.find((item) => item.key === +selectedMasterCate);
            
            const found = (foundMasterCategory?.children ?? []).find((item) => item.key === +payload);
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
