import { hideGlobalBg, showBgIII } from '@renderer/components/Layout';
import { APP_NAME, generatePageName } from '@renderer/constanst';
import TrainingModel from '@renderer/models/training.model';
import useLoginState from '@renderer/models/useLoginState';
import React, { useCallback, useEffect, useState } from 'react';
import DocumentTitle from 'react-document-title';
import { useNavigate } from 'react-router';
import styles from './index.less';
import Menu from './Menu';
import SubMenu from './SubMenu';

// 3.18rem; 7.08

const Training = () => {
    useLoginState();
    const [trainingState, dispatch] = TrainingModel.useModel();
    const navigate = useNavigate();
    const { selectedMasterCate, secondMenu = [] } = trainingState;
    useEffect(() => {
        hideGlobalBg();
        showBgIII();
    }, []);

    const handleSelectCate = useCallback((val: number|string) => {
        dispatch({
            type: 'training@setMasterCate',
            payload: val,
        });
        dispatch({
            type: 'training@getSecondMenuById',
            payload: val,
        });
    }, [dispatch]);

    return (
        <DocumentTitle title={generatePageName('培训项目总表')}>
            <div className={styles['training-page']}>
                <div className={styles['left-space']} />
                <div className={styles.menu}>
                    <Menu
                        active={selectedMasterCate}
                        onSelectChange={handleSelectCate}
                        menu={[
                            { key: 1, name: 'I 级培训项目' },
                            { key: 2, name: 'II 级培训项目' },
                            { key: 3, name: 'III 级培训项目' },
                        ]}
                    />
                </div>
                <div className={styles.content}>
                    <div className={styles['content-box']}>
                        <SubMenu
                            menuList={secondMenu}
                            onSelect={(selectKey: string|number) => {
                                if ([13, 14].includes(+selectKey)) {
                                    navigate(`/training/${selectKey}`);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </DocumentTitle>
    );
}

export default Training;