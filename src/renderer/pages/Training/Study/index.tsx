/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import { hideGlobalBg } from '@renderer/components/Layout';
import TreeList from '@renderer/components/TreeList';
import TrainingModel from '@renderer/models/training.model';
import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import styles from './index.less';

const Study: FC = () => {
    const [trainingState, dispatch] = TrainingModel.useModel();
    const { secCate, thirdCate } = useParams();
    useEffect(() => {
        hideGlobalBg();
    }, []);

    useEffect(() => {
        dispatch({
            type: 'training@startStudy',
            payload: {
                secCate,
                thirdCate,
            },
        })
    }, [secCate, thirdCate, dispatch]);
    return (
        <div className={styles['study-page']}>
            <div className={styles.left}>
                <div className={styles.title}>
                    {trainingState.secondTitle}
                </div>
                <div className={styles.tree}>
                    <TreeList
                        treeData={trainingState.currentStudyCategory ?? []}
                    />
                </div>
            </div>
            <div className={styles.content}>

            </div>
        </div>
    );
};

export default Study;
