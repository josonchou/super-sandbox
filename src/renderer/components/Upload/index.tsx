/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import React, { FC, useRef, useState } from 'react';
import styles from './index.less';

const Upload: FC = () => {
    const $file = useRef();
    const [selectedFile, setSelectedFile] = useState();
    return (
        <div className={styles.upload}>
            {selectedFile ? <span>已选择1个文件</span> : <span className={styles.icon}>+</span>}
            <input type="file" accept="video/mp4,application/msword,application/pdf,application/vnd.ms-powerpoint,application/vnd.ms-excel" ref={$file as any} onChange={(e) => {
                setSelectedFile(e.target.value as any);
            }}
            className={styles.uploader} />
        </div>
    )
};

export default Upload;
