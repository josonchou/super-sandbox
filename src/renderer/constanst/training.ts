/*
 * @description: 
 * @author: 周金顺（云天河）
 */

export const TrainingItem = [
    {
        key: 1,
        name: 'I级培训项目',
        kind: 'master',
        children: [
            {
                key: 11,
                name: '典型灾害应急避险与逃生',
                code: 'C-01',
                kind: 'sub',
            },
            {
                key: 12,
                name: '水淹厂房及全厂失电应急处置',
                code: 'C-02',
                kind: 'sub',
            },
            {
                key: 13,
                name: '火灾事故应急处置',
                code: 'C-03',
                kind: 'sub',
                children: [
                    {
                        key: 131,
                        name: '火灾基础知识',
                        code: 'F1-C-01',
                        kind: 'sub',
                        children: [
                            {
                                key: 1311,
                                name: '燃烧原理及火灾分类',
                                code: 'F1-1',
                                kind: 'sub',
                            },
                            {
                                key: 1312,
                                name: '常见火灾起因分析',
                                code: 'F1-2',
                                kind: 'sub',
                            },
                        ]   
                    },
                    {
                        key: 132,
                        name: '一般灭火设备使用',
                        code: 'F1-C-02',
                        kind: 'sub',
                        children: [
                            {
                                key: 1321,
                                name: '一般灭火设备使用',
                                code: 'F1-3',
                                kind: 'sub',
                            },
                        ]   
                    },
                    {
                        key: 133,
                        name: '消防设施的修护与管理',
                        code: 'F2-C-01',
                        kind: 'sub',
                        children: [
                            {
                                key: 1331,
                                name: '消防设施及其工作原理',
                                code: 'F2-1',
                                kind: 'sub',
                            },
                            {
                                key: 1332,
                                name: '消防设施日常运维与管理',
                                code: 'F2-2',
                                kind: 'sub',
                            },      
                        ]   
                    },
                    {
                        key: 134,
                        name: '火灾隐患排查和防火措施',
                        code: 'F3-C-01',
                        kind: 'sub',
                        children: [
                            {
                                key: 1341,
                                name: '火灾隐患排查及风险评估',
                                code: 'F3-1',
                                kind: 'sub',
                            },
                            {
                                key: 1342,
                                name: '水电厂重点防火部位防火措施',
                                code: 'F3-2',
                                kind: 'sub',
                            },
                        ]   
                    },
                    {
                        key: 135,
                        name: '火灾事故应急处置',
                        code: 'F4-C-01',
                        kind: 'sub',
                        children: [
                            {
                                key: 1351,
                                name: '火灾报警与初起火灾扑救',
                                code: 'F4-1',
                                kind: 'sub',
                            },
                            {
                                key: 1352,
                                name: '火灾逃生',
                                code: 'F4-2',
                                kind: 'sub',
                            },      
                        ]
                    },
                ]
            },
            {
                key: 14,
                name: '应急救援',
                code: 'C-04',
                kind: 'sub',
                children: [
                    {
                        key: 141,
                        name: '山地绳索救援的基本技能',
                        code: 'J1-C-01',
                        kind: 'sub',
                        children: [
                            {
                                key: 1411,
                                name: '救援绳结打结方法',
                                code: 'J1-1',
                                kind: 'sub',
                            },
                            {
                                key: 1412,
                                name: '登山装备的使用',
                                code: 'J1-2',
                                kind: 'sub',
                            },
                            {
                                key: 1413,
                                name: '等高线地形图识别',
                                code: 'J1-3',
                                kind: 'sub',
                            },
                            {
                                key: 1414,
                                name: '山地搜索基本方法',
                                code: 'J1-4',
                                kind: 'sub',
                            },
                            {
                                key: 1415,
                                name: '绳索救援技术与常用装备的使用',
                                code: 'J1-5',
                                kind: 'sub',
                            },
                        ]
                    },
                    {
                        key: 142,
                        name: '水域搜索与救援的基本技能与评估方法',
                        code: 'J2-C-01',
                        kind: 'sub',
                        children: [
                            {
                                key: 1421,
                                name: '充气式无动力救援艇的技术指标与操作规程',
                                code: 'J2-1',
                                kind: 'sub',
                            },
                            {
                                key: 1422,
                                name: '水域搜救中的个人防护',
                                code: 'J2-2',
                                kind: 'sub',
                            },
                            {
                                key: 1423,
                                name: '游泳姿势及呼吸方法',
                                code: 'J2-3',
                                kind: 'sub',
                            },
                            {
                                key: 1424,
                                name: '激流救援',
                                code: 'J2-4',
                                kind: 'sub',
                            },
                            {
                                key: 1425,
                                name: '水域搜救现场评估',
                                code: 'J2-5',
                                kind: 'sub',
                            },
                        ]
                    },
                    {
                        key: 143,
                        name: '有限空间救援的基本技能与评估方法',
                        code: 'J3-C-01',
                        kind: 'sub',
                        children: [
                            {
                                key: 1431,
                                name: '便携式气体检测报警仪操作',
                                code: 'J3-1',
                                kind: 'sub',
                            },
                            {
                                key: 1432,
                                name: '密闭空间的通风',
                                code: 'J3-2',
                                kind: 'sub',
                            },
                            {
                                key: 1433,
                                name: '正压呼吸器使用方法',
                                code: 'J3-3',
                                kind: 'sub',
                            },
                            {
                                key: 1434,
                                name: '破拆工具的使用与救援',
                                code: 'J3-4',
                                kind: 'sub',
                            },
                            {
                                key: 1435,
                                name: '有限空间救援现场评估',
                                code: 'J3-5',
                                kind: 'sub',
                            },
                        ]
                    },
                    {
                        key: 144,
                        name: '伤员外伤急救技能',
                        code: 'J4-C-01',
                        kind: 'sub',
                        children: [
                            {
                                key: 1441,
                                name: '伤员的检伤分类',
                                code: 'J4-1',
                                kind: 'sub',
                            },
                            {
                                key: 1442,
                                name: '外伤止血与包扎',
                                code: 'J4-2',
                                kind: 'sub',
                            },
                            {
                                key: 1443,
                                name: '骨折的现场判断与固定',
                                code: 'J4-3',
                                kind: 'sub',
                            },
                            {
                                key: 1444,
                                name: '伤员固定的操作方法',
                                code: 'J4-4',
                                kind: 'sub',
                            },
                            {
                                key: 1445,
                                name: '担架的组装与使用',
                                code: 'J4-5',
                                kind: 'sub',
                            },
                            {
                                key: 1446,
                                name: '四肢离断伤的处置',
                                code: 'J4-6',
                                kind: 'sub',
                            },
                            {
                                key: 1447,
                                name: '内脏脱出伤的处置',
                                code: 'J4-7',
                                kind: 'sub',
                            },
                            {
                                key: 1448,
                                name: '刺入伤的处置',
                                code: 'J4-8',
                                kind: 'sub',
                            },
                            {
                                key: 1449,
                                name: '冻伤、失温症、中暑等环境急症的现场处置',
                                code: 'J4-9',
                                kind: 'sub',
                            },
                            {
                                key: 14410,
                                name: '心肺复苏的操作方法',
                                code: 'J4-10',
                                kind: 'sub',
                            },
                            {
                                key: 14411,
                                name: '自动体外除颤仪(AED)的使用',
                                code: 'J4-11',
                                kind: 'sub',
                            },
                        ]
                    },
                    {
                        key: 145,
                        name: '逃生与避险技能',
                        code: 'J5-C-01',
                        kind: 'sub',
                        children: [
                            {
                                key: 1451,
                                name: '常见突发事件的避险和逃生',
                                code: 'J5-1',
                                kind: 'sub',
                            },
                            {
                                key: 1452,
                                name: '防护装备的使用',
                                code: 'J5-2',
                                kind: 'sub',
                            },
                            {
                                key: 1453,
                                name: '应急逃生器材的使用',
                                code: 'J5-3',
                                kind: 'sub',
                            }
                        ]
                    },
                ],
            },
        ],
    },
    {
        key: 2,
        name: 'II级培训项目',
        kind: 'master',
        children: [
            {
                key: 21,
                name: '地质灾害管理与预防',
                code: 'B-01',
                kind: 'sub',
            },
            {
                key: 22,
                name: '防洪应急管理与预防',
                code: 'B-02',
                kind: 'sub',
            },
            {
                key: 23,
                name: '防水淹厂房应急管理与预防',
                code: 'B-03',
                kind: 'sub',
            },
            {
                key: 24,
                name: '溃坝事故应急管理与预防',
                code: 'B-04',
                kind: 'sub',
            },
            {
                key: 25,
                name: '火灾事故预防与应急管理',
                code: 'B-05',
                kind: 'sub',
            },
            {
                key: 26,
                name: '地震灾害管理与预防',
                code: 'B-06',
                kind: 'sub',
            },
            {
                key: 27,
                name: '冰冻灾害预防及全厂失电处置',
                code: 'B-07',
                kind: 'sub',
            },
        ],
    },
    {
        key: 3,
        name: 'III级培训项目',
        kind: 'master',
        children: [
            {
                key: 31,
                name: '应急指挥与决策',
                kind: 'sub',
                code: 'A-01',
            },
        ],
    },
]