import { hideGlobalBg } from '@renderer/components/Layout';
import { generatePageName } from '@renderer/constanst';
import useLoginState from '@renderer/models/useLoginState';
import React, { useCallback, useEffect, MouseEvent, useState, useMemo } from 'react';
import DocumentTitle from 'react-document-title';
import AccountManager from './AccountManager';
import CourseManager from './CourseManager';

import styles from './index.less';

const Settings = () => {
    const [currentMenu, setCurrentMenu] = useState(0);
    useLoginState();
    useEffect(() => {
        hideGlobalBg();
    }, []);

    const selectionOffset = useMemo(() => {
        switch (currentMenu) {
            case 0:
                return '-3.58rem';
            case 1:
                return '3.78rem';
            default:
                return 0;
        }
    }, [currentMenu]);

    return (
        <DocumentTitle title={generatePageName('系统设置')}>
            <div className={styles['page-content']}>
                <div className={styles.sidebar}>
                    <div className={styles.menu}>
                        <ul>
                            <li
                                onClick={() => {
                                    setCurrentMenu(0);
                                }}
                            >
                                账号管理
                            </li>
                            <li
                                onClick={() => {
                                    setCurrentMenu(1);
                                }}
                            >
                                课件管理
                            </li>
                        </ul>
                        <div className={styles.selection} style={{ top: selectionOffset }} />
                    </div>
                </div>
                {currentMenu === 0 ? <AccountManager /> : null}
                {currentMenu === 1 ? <CourseManager /> : null}
            </div>
        </DocumentTitle>
    );
}

export default Settings;