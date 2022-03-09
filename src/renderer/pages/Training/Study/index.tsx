/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import { hideGlobalBg } from '@renderer/components/Layout';
import TreeList from '@renderer/components/TreeList';
import TrainingModel from '@renderer/models/training.model';
import classNames from 'classnames';
import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import CourseReader from './CourseReader';
import styles from './index.less';

const Study: FC = () => {
    const [trainingState, dispatch] = TrainingModel.useModel();
    const { courseList, currentCourse } = trainingState;
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
                <div className={styles.reader}>
                    <CourseReader
                        type={currentCourse.kind}
                        src={currentCourse.src}
                        // cover={currentCourse?.cover}
                    />
                </div>
                <div className={styles['courseware-list']}>
                    <div className={styles.title}>
                        <span>课件列表</span>
                    </div>
                    <div className={styles.list}>
                        {
                            courseList.map((item) => {
                                return (
                                    <div
                                        key={item.key}
                                        className={classNames(styles['course-item'], {
                                            [styles.active]: item.key === currentCourse.key,
                                        })}
                                        onClick={() => {
                                            dispatch({
                                                type: 'training@apply',
                                                payload: {
                                                    currentCourse: item,
                                                },
                                            });
                                        }}
                                    >
                                        <div className={styles.cover} />
                                        <div className={styles['item-title']}>
                                            {item.name}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Study;
