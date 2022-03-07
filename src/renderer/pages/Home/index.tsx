import { useNavigate } from 'react-router';
import UserInfoModel from '@renderer/models/userInfo.model';
import React, { useCallback, useEffect, useMemo } from 'react';
import { hideGlobalBg } from '@renderer/components/Layout';
import styles from './index.less';
import AbilityTableModel from '@renderer/models/abilityTable.model';
import AbilityMenu from './AbilityMenu';
import DocumentTitle from 'react-document-title';
import { generatePageName } from '@renderer/constanst';

const Home = () => {
    const [userInfo] = UserInfoModel.useModel();
    const [abilityTable, dispatch] = AbilityTableModel.useModel();
    const navigate = useNavigate()

    useEffect(() => {
        if (!userInfo.uid) {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    useEffect(() => {
        hideGlobalBg();
        dispatch({ type: 'abilityTable@reqAbility' });
    }, [dispatch]);

    const handleMenuChange = useCallback((activeKey: number) => {
        dispatch({
            type: 'selectMenu',
            payload: activeKey,
        });
    }, [dispatch]);

    const subMenus = useMemo(() => {
        const foundMenu = abilityTable.abilityTree.find((item) => item.id === abilityTable.currentSelectMenu);
        return (foundMenu?.children ?? []).map((item) => (
            <div key={item.id} className={styles['sub-menu-box']}>
                <div className={[styles['sub-menu-item'], styles.title].join(' ')}>
                    {item.name}({item.code})
                </div>
                {
                    (item.children ?? []).map((subChild) => (
                        <div key={subChild.id} className={styles['sub-menu-item']}>
                            {subChild.name}({subChild.code})
                        </div>
                    ))
                }
            </div>
        ));
    }, [abilityTable.abilityTree, abilityTable.currentSelectMenu]);

    return (
        <DocumentTitle title={generatePageName('能力总表')}>
            <div className={styles['page-container']}>
                <div className={styles.menu}>
                    <div className={styles['menu-bg-wrapper']}>
                        <div className={styles['menu-big-bg']} />
                    </div>
                    <AbilityMenu
                        data={abilityTable.abilityTree ?? []}
                        activeKey={abilityTable.currentSelectMenu}
                        onChange={handleMenuChange}
                    />
                </div>
                <div className={styles.split} />
                <div className={styles['sub-menu']}>
                    <div className={styles['sub-menu-wrapper']}>
                        <div className={styles.masonry}>
                            {subMenus}
                        </div>
                    </div>
                </div>
            </div>
        </DocumentTitle>
    );
};

export default Home;
