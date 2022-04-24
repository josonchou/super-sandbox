import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useCheckboxState, Checkbox as KitCheckbox } from "reakit/Checkbox";
import Space from '../Space';
import styles from './styles.less';

export interface CheckboxProps {
    value?: Array<string>;
    onChange?: (val: Array<string>) => void;
}

const Checkbox: FC<CheckboxProps> = ({ value, onChange }) => {
    const checkboxState = useCheckboxState({
        state: value ?? [],
    });

    useEffect(() => {
        checkboxState.setState(value ?? []);
    }, [JSON.stringify(value)]);

    const handleChange = useCallback((val) => {
        onChange && onChange(val);
        checkboxState.setState(val);
    }, [onChange]);

    return (
        <div className={styles['checkbox-group']}>
            <Space>
                <label>
                    <KitCheckbox
                        {...checkboxState}
                        setState={() => {
                            handleChange(['1']);
                        }}
                        value="1"
                    />
                    管理员
                </label>
                <label>
                    <KitCheckbox
                        {...checkboxState}
                        setState={() => {
                            handleChange(['2']);
                        }}
                        value="2"
                        key="2"
                    />
                   讲师
                </label>
            </Space>
        </div>
    )
};

export default Checkbox;
