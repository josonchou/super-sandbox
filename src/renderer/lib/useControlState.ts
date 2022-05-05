/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import useMemoFn from './useMemoFn';

export interface UseControlStateProps<T> {
    value?: T;
    onChange?: (val: T) => void;
    defaultValue?: T;
}

export default function useControlState<T = any>(options: UseControlStateProps<T>): [T, Dispatch<SetStateAction<T>>] {
    const { value, onChange, defaultValue } = options;
    const [innerValue, setInnerValue] = useState<any>(value ?? defaultValue);
    const [tempVal, dispatch] = useState<any>(value ?? defaultValue);

    useEffect(() => {
        if (!value) {
            setInnerValue(value);
        }
    }, [value]);

    const realValue = useMemo(() => {
        if (value) {
            return value;
        }
        return innerValue;
    }, [value, innerValue]);

    const handleChange = useMemoFn((val: any) => {
        setInnerValue(val);
        if (onChange) {
            onChange(val);
        }
    });

    useEffect(() => {
        console.log(tempVal, 'tempVal==?');
        
        handleChange(tempVal);
    }, [tempVal, handleChange]);

    return [realValue, dispatch];
}