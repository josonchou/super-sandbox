/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import { TrainingItem } from '@renderer/constanst/training';
import { makeModal } from '@renderer/store';
import pdf from '@assets/test.pdf';
import videocover from '@assets/videocover.jpeg';


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
        courseList: [
            {
                key: 1,
                name: '冷却灭火法',
                cover: videocover,
                kind: 'video',
                src: 'http://mvdown.kuwo.cn/2fe5f0ccfe069c05504904134ce92059/62261d80/resource/m2/58/99/3179728089.mp4',
            },
            {
                key: 2,
                name: '窒息灭火法',
                cover: '1',
                kind: 'pdf',
                src: pdf,
            },
            {
                key: 3,
                name: '冷却灭火法',
                cover: videocover,
                kind: 'video',
                src: 'http://mvdown.kuwo.cn/2fe5f0ccfe069c05504904134ce92059/62261d80/resource/m2/58/99/3179728089.mp4',
            },
        ],
        currentCourse: {
            key: 1,
            name: '冷却灭火法',
            cover: videocover,
            kind: 'video',
            src: 'http://mvdown.kuwo.cn/2fe5f0ccfe069c05504904134ce92059/62261d80/resource/m2/58/99/3179728089.mp4',
        },
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
