/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import { hideGlobalBg } from '@renderer/components/Layout';
import TreeList from '@renderer/components/TreeList';
import { getServerHost } from '@renderer/lib/request';
import TrainingModel from '@renderer/models/training.model';
import classNames from 'classnames';
import React, { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import CourseReader from './CourseReader';
import styles from './index.less';

const Study: FC = () => {
    const [trainingState, dispatch] = TrainingModel.useModel();
    const { courseList, currentCourse, expendedKeys, selectedKey } = trainingState;
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
    
    const isEmpty = useMemo(() => {
        return !courseList?.length;
    }, [courseList]);

    return (
        <div className={styles['study-page']}>
            <div className={styles.left}>
                <div className={styles.title}>
                    {trainingState.secondTitle}
                </div>
                <div className={styles.tree}>
                    <TreeList
                        expendedKeys={expendedKeys}
                        onExpended={(keys) => {
                            console.log('debug ==> onExpended=>', keys);
                            
                            dispatch({
                                type: 'training@onExpended',
                                payload: keys,
                            });
                        }}
                        selectedkey={selectedKey}
                        treeData={trainingState.currentStudyCategory ?? []}
                        onSelected={({ key }) => {
                            dispatch({
                                type: 'training@handleSelected',
                                payload: key,
                            });
                        }}
                    />
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.reader}>
                    {
                        isEmpty ? (
                            <div className={styles.empty}>
                                暂无数据
                            </div>
                        ) : (
                            <CourseReader
                                type={(currentCourse as any).courseType}
                                src={`${getServerHost()}/files/view/${(currentCourse as any).fileUUID}`}
                                uuid={(currentCourse as any).fileUUID}
                                title={(currentCourse as any).courseName}
                            />
                        )
                    }
                </div>
                <div className={styles['courseware-list']}>
                    <div className={styles.title} style={{ display: isEmpty ? 'none': undefined }}>
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
