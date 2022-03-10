import React, { FC } from 'react';
import { useCheckboxState, Checkbox as KitCheckbox } from "reakit/Checkbox";
import Space from '../Space';
import styles from './styles.less';

const Checkbox: FC = () => {
    const checkboxState = useCheckboxState();
    return (
        <div className={styles['checkbox-group']}>
            <Space>
                <label>
                    <KitCheckbox {...checkboxState} value="管理员" />
                    管理员
                </label>
                <label>
                    <KitCheckbox {...checkboxState} value="讲师" />
                   讲师
                </label>
            </Space>
        </div>
    )
};

export default Checkbox;
