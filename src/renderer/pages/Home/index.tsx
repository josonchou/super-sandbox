import React, { useCallback, useEffect, useMemo } from 'react';
import { hideGlobalBg, showBgIII } from '@renderer/components/Layout';
import styles from './index.less';
import AbilityTableModel from '@renderer/models/abilityTable.model';
import AbilityMenu from './AbilityMenu';
import DocumentTitle from 'react-document-title';
import { generatePageName } from '@renderer/constanst';
import useLoginState from '@renderer/models/useLoginState';



const Home = () => {
    const [abilityTable, dispatch] = AbilityTableModel.useModel();
    useLoginState();

    useEffect(() => {
        hideGlobalBg();
        showBgIII();
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
        let count = 0;
        const group: Array<Array<React.ReactNode>> = [];
        (foundMenu?.children ?? []).forEach((item) => {
            if (count > 2) {
                count = 0;
            }
            if (!group[count]) {
                group[count] = [];
            }
            group[count].push((
                <div key={item.id} className={styles['sub-menu-box']}>
                    <div className={[styles['sub-menu-item'], styles.title].join(' ')}>
                        <span style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                            <span>{item.name}</span>
                            <span style={{ display: 'inline-block'}}>({item.code})</span>
                        </span>
                    </div>
                    {
                        (item.children ?? []).map((subChild) => (
                            <div key={subChild.id} className={styles['sub-menu-item']}>
                                <span style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                                    <span>{subChild.name}</span>
                                    <span style={{ display: 'inline-block' }}>({subChild.code})</span>
                                </span>
                            </div>
                        ))
                    }
                </div>
            ));
            count += 1;
        });

        return group.map((item, index) => (
            <div key={index} className={styles['sub-menu-col']}>
                {item}
            </div>
        ))
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
                        <div className={styles.inline}>
                            <div className={styles.masonry}>
                                {subMenus}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DocumentTitle>
    );
};

export default Home;
