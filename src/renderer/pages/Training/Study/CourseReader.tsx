/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import request, { getServerHost } from '@renderer/lib/request';
import React, { FC, useEffect, useMemo, useRef } from 'react';
import styles from './CourseReader.less';

interface CourseReaderProps {
    title?: string;
    type?: string;
    src?: string;
    cover?: string;
    uuid: string;
}

const renderDoc = (conf: any) => {
    return request({
        url: '/files/reader/token',
        method: 'post',
        data: conf,
    }).then(([isOk, token]) => {
        if (isOk) {
            conf.token = token as string;
            const editor = new (window as any).DocsAPI.DocEditor("docReader", conf);
            return editor;
        }

        return null;
    }).catch(() => {
        return null;
    });
}

const getDocumentType = (fileExt: string) => {
    switch (fileExt) {
        case 'pdf':
        case 'doc':
        case 'docx':
        case 'txt':
            return 'word';
        case 'xls':
        case 'xlsx':
            return 'cell';
        case 'ppt':
        case 'pptx':
            return 'slide';
        default:
            return '';
    }
}

const CourseReader: FC<CourseReaderProps> = ({ uuid, title, type, src, cover }) => {
    const editor = useRef<any>();

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
                    // type="application/pdf"
                    src={`${src}#page=1&view=FitH,top`}
                    // sandbox=""
                    width="100%"
                    height="100%"
                    allowFullScreen
                />
            )
        }

        // return (
        //     <div className={styles.titlebar} >
        //         {title}
        //     </div>
        // );
        return null;
    }, [type, src, title]);

    useEffect(() => {
        
        if (!type || !src) {
            return () => {};
        }

        // eslint-disable-next-line
        const config = {
            "width": "100%",
            "height": "100%",
            "token": "",
            // "type": "embedded",
            "document": {
                "fileType": "",
                "key": "Khirz6zTPdfd7",
                "title": "",
                "url": src,
                "info": {
                    "author": "SANDBOX",
                    "created": "NOW",
                },
                "permissions": {
                    "comment": false,
                    "download": false,
                    "edit": false,
                    "fillForms": false,
                    "modifyFilter": false,
                    "modifyContentControl": false,
                    "review": false
                },
            },
            // "documentType": getDocumentType(type),
            "editorConfig": {
                "actionLink": null,
                "mode": "view",
                "lang": 'zh-CN',
                "user": {
                    "id": "uid-1",
                    "name": "SANDBOX"
                },
                "callbackUrl": `${getServerHost()}/track`,
            },
            "customization": {
                "autosave": false,
                "about": false,
                "chat": true,
                "comments": false,
                "feedback": false,
                "forcesave": false,
                "goback": false,
                "help": false,
                "hideNotes": true,
                "hideRightMenu": true,
                "plugins": false,
                "toolbarHideFileName": false,
                "toolbarNoTabs": true,
                "compactHeader": false,
                "compactToolbar": false,
                "compatibleFeatures": false,
                "unit": "cm",
                "zoom": 100
            },
            "fileChoiceUrl": "",
            "plugins": {"pluginsData":[]},
        };

        if (['docx', 'pptx', 'doc', 'ppt', 'xlsx', 'xls'].includes(type)) {
            config.document.title = title ?? '文档';
            config.document.fileType = type;
            config.document.key = `${uuid}`;
            if (editor.current && editor.current.destroyEditor) {
                editor.current.destroyEditor();
            }
            renderDoc(config).then((ed) => {
                editor.current = ed;
            });
        }

        return () => {
            if (editor.current && editor.current.destroyEditor) {
                editor.current.destroyEditor();
            }
        };
    }, [type, src]);
    
    return (
        <div id="courseReader" className={styles['course-reader']}>
            {readerElem}
            <div id="docReader" />
        </div>
    );
};

export default CourseReader;
