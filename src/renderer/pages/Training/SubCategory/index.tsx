/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import { hideGlobalBg } from '@renderer/components/Layout';
import TrainingModel from '@renderer/models/training.model';
import classNames from 'classnames';
import React, { FC, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import SubMenu from '../SubMenu';
import styles from './index.less';

const SubCategory: FC = () => {
    useEffect(() => {
        hideGlobalBg();
    }, []);
    const [trainingState, dispatch] = TrainingModel.useModel();
    const { thirdMenu = [], secondTitle } = trainingState;
    const { secCate } = useParams();

    useEffect(() => {
        if (secCate) {
            dispatch({
                type: 'training@getThirdMenuBySecondId',
                payload: secCate,
            });
        }
    }, [secCate, dispatch]);
    

    const navigate = useNavigate();

    const iconClassName = useMemo(() => {
        if (secCate && +(secCate as any) === 13) {
            return styles['icon-02'];
        }

        return styles['icon-01'];
    }, [secCate]);

    return (
        <div className={styles['page-content']}>
            <div className={styles.header}>
                <div className={styles['back-btn']} onClick={() => navigate('/training')}>
                    <div className={styles['back-icon']} />
                    <div className={styles.back}>
                        返回上一级
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles['title-box']}>
                    <div className={styles['title-wraper']}>
                        <div className={styles.icon}>
                            <div className={styles['icon-box']} />
                            <div className={classNames(styles.subicon, iconClassName)} />
                        </div>
                        <div className={styles.title}>
                            {secondTitle}
                        </div>
                    </div>
                </div>
                <div className={styles['content-body']}>
                    <SubMenu
                        menuList={thirdMenu}
                        onSelect={(selectKey: string|number) => {
                            navigate(`/training/study/${secCate}/${selectKey}`);
                        }}
                    />
                </div>
            </div>
        </div>
    )
};

export default SubCategory;
