import { dispatch } from '@renderer/store';
import React, { FC, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router';
import LinkButton from '../Button/LinkButton';
import Space from '../Space';
import styles from './index.less';

interface HeaderProps {
    isLogin?: boolean;
}

const Header: FC<HeaderProps> = ({ isLogin }) => {
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
        navigate('/');
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
            <div className={styles['title-wrapper']}>
                <div className={styles.title}>
                    应急课程教学数字沙盘系统
                </div>
            </div>
            <div className={styles.icon}>
                <span>
                    中国华能
                </span>
            </div>
            <div className={styles.action}>
                {isLogin ? (
                    <Space gap={1.56} gapUnit="rem" >
                        <LinkButton active={activeMenu === 'Home'} icon="data" onClick={toHome}>
                            能力总表
                        </LinkButton>
                        <LinkButton active={activeMenu === 'Training'} icon="book" onClick={toTraining}>
                            培训项目总表
                        </LinkButton>
                        <LinkButton active={activeMenu === 'Setting'} icon="settings" onClick={toSettings}>
                            系统设置
                        </LinkButton>
                        <LinkButton icon="exit" onClick={handleLoginOut}>
                            退出登录
                        </LinkButton>
                    </Space>
                ) : null}
            </div>
        </div>
    )
}

export default Header;
