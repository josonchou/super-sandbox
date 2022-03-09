/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import React, { FC, useMemo } from 'react';
import styles from './CourseReader.less';

interface CourseReaderProps {
    type?: string;
    src?: string;
    cover?: string;
}

const CourseReader: FC<CourseReaderProps> = ({ type, src, cover }) => {

    const readerElem = useMemo(() => {
        if (!src) {
            return null;
        }
        if (type === 'video') {
            return (
                <div className={styles.video}>
                    <div className={styles['video-container']}>
                        <video
                            preload="meta"
                            // poster="http://imgcdn.170hi.com/wmvpic/640/68/57/3075077292.jpg?imageView2/format/jpg/q/40"
                            poster={cover}
                            controls
                            autoPlay={false}
                            className={styles.video}
                            // onContextMenu="return false;"
                            // height="100%" width="100%"
                            // style="background-color: #333;"
                        >
                            <source
                                // src="http://antiserver.kuwo.cn/anti.s?rid=MUSIC_7154771&amp;response=res&amp;format=mp4|mkv&amp;type=convert_url"
                                src={src}
                                type="video/mp4"
                            />
                        </video>
                    </div>
                </div>
            );
        }
        if (type === 'pdf') {
            return (
                <iframe
                    className={styles.pdf}
                    src={src}
                    allowFullScreen
                    // @ts-ignore
                    webkitallowfullscreen="true"
                    // @ts-ignore
                    mozallowfullscreen="true"
                />
            )
        }

        return null;
    }, [type, src]);
    
    return (
        <div className={styles['course-reader']}>
            {readerElem}
        </div>
    );
};

export default CourseReader;
