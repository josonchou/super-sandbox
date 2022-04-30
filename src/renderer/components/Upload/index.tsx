/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.less';

export interface UploadProps {
    value?: any;
    onChange?: (val: any) => void;
}

const Upload: FC<UploadProps> = ({ value, onChange }) => {
    const $file = useRef();
    const [currSelectedFile, setSelectedFile] = useState(value);

    const selectedFile = useMemo(() => {
        if (typeof value !== 'undefined') {
            return value;
        }

        return currSelectedFile;
    }, [value, currSelectedFile]);

    useEffect(() => {
        if (typeof value === 'undefined') {
            setSelectedFile(value);
        }
    }, [value]);

    const handleChange = useCallback((val) => {
        setSelectedFile(val);
        onChange && onChange(val);
    }, [onChange]);

    console.log(currSelectedFile, 'currS')
    
    return (
        <div className={styles.upload}>
            {(selectedFile || [])[0] ? <span>已选择1个文件</span> : <span className={styles.icon} />}
            <input type="file" accept="video/mp4,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/msword,application/pdf,application/vnd.ms-powerpoint,application/vnd.ms-excel" ref={$file as any} onChange={(e) => {
                handleChange(e.target.files as any);
            }}
            className={styles.uploader} />
        </div>
    );
};

export default Upload;
