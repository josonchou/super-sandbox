import { dispatch } from '@renderer/store';
import React, { FC, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import LinkButton from '../Button/LinkButton';
import Space from '../Space';
import styles from './index.less';

interface HeaderProps {
    isLogin?: boolean;
    isManager?: boolean;
}

const Header: FC<HeaderProps> = ({ isLogin, isManager }) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleLoginOut = useCallback(() => {
        dispatch({
            type: 'userInfo@logout',
            payload: {
                navigate,
            },
        });
    }, [navigate]);

    const toHome = useCallback(() => {
        navigate('/home');
    }, [navigate]);

    const toTraining = useCallback(() => {
        navigate('/training');
    }, [navigate]);

    const toSettings = useCallback(() => {
        navigate('/settings');
    }, [navigate]);

    const activeMenu = useMemo(() => {
        if (/settings/.test(location.pathname)) {
            return 'Setting';
        }

        if (/training/.test(location.pathname)) {
            return 'Training';
        }

        return 'Home';
    }, [location.pathname]);

    return (
        <div className={styles.header}>
            <div className={styles['title-wrapper']} style={{ visibility: 'hidden'}}>
                <div className={styles.title}>
                    应急课程教学数字沙盘系统
                </div>
            </div>
            <div className={styles.icon} style={{ visibility: 'hidden'}} />
            <div className={styles.action}>
                {isLogin ? (
                    <Space gap={1.56} gapUnit="rem" >
                        <LinkButton active={activeMenu === 'Home'} className={styles.menuItem} icon="data" onClick={toHome}>
                            能力总表
                        </LinkButton>
                        <LinkButton active={activeMenu === 'Training'} className={styles.menuItem} icon="book" onClick={toTraining}>
                            培训项目总表
                        </LinkButton>
                        {
                            isManager ? (
                                <LinkButton active={activeMenu === 'Setting'} className={styles.menuItem} icon="settings" onClick={toSettings}>
                                    系统设置
                                </LinkButton>
                            ) : null
                        }
                        <LinkButton icon="exit" className={styles.menuItem} onClick={handleLoginOut}>
                            退出登录
                        </LinkButton>
                    </Space>
                ) : null}
            </div>
        </div>
    )
}

export default Header;
