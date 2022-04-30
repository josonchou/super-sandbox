/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import { hideGlobalBg } from '@renderer/components/Layout';
import TreeList from '@renderer/components/TreeList';
import { getServerHost } from '@renderer/lib/request';
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

    console.log(courseList, 'courseList')
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
                        onSelected={({ key }) => {
                            const keyArr = String(key ?? '').split('-');
                            dispatch({
                                type: 'training@loadCourse',
                                payload: keyArr[(keyArr.length ?? 1) - 1],
                            });
                        }}
                    />
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.reader}>
                    <CourseReader
                        type={(currentCourse as any).courseType}
                        src={`${getServerHost()}/files/view/${(currentCourse as any).fileUUID}`}
                        // cover={currentCourse?.cover}\
                        uuid={(currentCourse as any).fileUUID}
                        title={(currentCourse as any).courseName}
                    />
                </div>
                <div className={styles['courseware-list']}>
                    <div className={styles.title}>
                        <span>课件列表</span>
                    </div>
                    <div className={styles.list}>
                        {
                            courseList.map((item: any) => {
                                return (
                                    <div
                                        key={item.id}
                                        className={classNames(styles['course-item'], {
                                            [styles.active]: item.id === (currentCourse as any).id,
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
                                        <div className={classNames(styles.cover, (item as any).courseType)} />
                                        <div className={styles['item-title']}>
                                            {item.courseName}
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
