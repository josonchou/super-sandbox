import React, { CSSProperties, FC, useCallback, useState } from 'react'
import classNames from 'classnames';
import styles from './index.less';
import Icon from '../Icon';

interface InputProps {
    value?: string;
    onChange?: HTMLInputElement['onchange'];
    className?: HTMLInputElement['className'];
    placeholder?: HTMLInputElement['placeholder'];
    style?: CSSProperties;
    type?: HTMLInputElement['type'];
    autoComplete?: HTMLInputElement['autocomplete'];
    iconType?: string;
}

const Input: FC<InputProps> = (props) => {
    const { className, iconType, style, placeholder, ...restProps } = props;

    const [realPlaceholder, setRealPlaceholder] = useState<string|undefined>(placeholder);

    const handleFocus = useCallback(() => {
        setRealPlaceholder(undefined);
    }, []);

    const handleBlur = useCallback(() => {
        setRealPlaceholder(placeholder);
    }, [placeholder]);
    
    return (
        <div style={style} className={classNames(styles['sandbox-input'], className)}>
            <div className={styles.prefix}>
                <Icon type={iconType} />
            </div>
            <input
                {...restProps as any}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={realPlaceholder}
            />
            <div className={styles.addon} />
        </div>
    )
}

export default Input;