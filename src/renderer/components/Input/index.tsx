import React, { FC, useCallback, useRef, useState } from 'react'
import { Input as ReactInput } from 'reakit/Input';
import classNames from 'classnames';
import styles from './index.less';

interface InputProps {
    value?: string;
    onChange?: () => void;
    className?: HTMLInputElement['className'];
    placeholder?: HTMLInputElement['placeholder'];
    style?: HTMLInputElement['style'];
    type?: HTMLInputElement['type'];
    autoComplete?: HTMLInputElement['autocomplete'];
}

const Input: FC<InputProps> = (props) => {
    const { className, placeholder } = props;

    const [realPlaceholder, setRealPlaceholder] = useState<string|undefined>(placeholder);

    const handleFocus = useCallback(() => {
        console.log('onFocus');
        setRealPlaceholder(undefined);
    }, [placeholder]);

    const handleBlur = useCallback(() => {
        setRealPlaceholder(placeholder);
    }, [placeholder]);
    
    return (
        <ReactInput
            {...props as any}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={realPlaceholder}
            className={classNames(styles['sandbox-input'], className)}
        />
    )
}

export default Input;