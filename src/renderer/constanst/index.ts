import { APP_NAME as name } from '@config/index';

export const APP_NAME = name;

export const Ability = [
    {
        name: '基础能力',
        code: 'A',
        id: 1,
        sort: 1,
        children: [
            {
                name: '法律法规',
                code: 'A1',
                id: 11,
                children: [
                    {
                        name: '水电厂应急管理法律法规辨识',
                        code: 'A1-1',
                        id: 111,
                    },
                    {
                        name: '国家应急管理基本法',
                        code: 'A1-2',
                        id: 112,
                    },
                    {
                        name: '国家相关防灾减灾救灾法',
                        code: 'A1-3',
                        id: 113,
                    },
                ],
            },
            {
                name: '应急管理概论',
                code: 'A2',
                id: 12,
                children: [
                    {
                        name: '应急管理概述',
                        code: 'A2-1',
                        id: 111,
                    },
                    {
                        name: '应急管理体制与机制',
                        code: 'A2-2',
                        id: 112,
                    },
                    {
                        name: '应急预案管理',
                        code: 'A2-3',
                        id: 113,
                    },
                ],
            },
            {
                name: '应急技术概论',
                code: 'A3',
                id: 13,
                children: [
                    {
                        name: '应急管理技术',
                        code: 'A3-1',
                        id: 131, 
                    },
                    {
                        name: '风险辨识与监控',
                        code: 'A3-2',
                        id: 132, 
                    },
                    {
                        name: '应急救援及装备',
                        code: 'A3-3',
                        id: 133, 
                    },
                    {
                        name: '灾害风险评估',
                        code: 'A3-4',
                        id: 134, 
                    },
                    {
                        name: '事故调查',
                        code: 'A3-5',
                        id: 135, 
                    },
                ],
            },
            {
                name: '应急指挥与决策基础',
                code: 'A4',
                id: 14,
                children: [
                    {
                        name: '应急指挥的基本理念',
                        code: 'A4-1',
                        id: 141, 
                    },
                    {
                        name: '应急指挥决策机制',
                        code: 'A4-2',
                        id: 142, 
                    },
                    {
                        name: '应急指挥体系构建的原则',
                        code: 'A4-3',
                        id: 143, 
                    },
                    {
                        name: '应急指挥系统介绍',
                        code: 'A4-4',
                        id: 144, 
                    },
                    {
                        name: '应急决策理论与方法',
                        code: 'A4-5',
                        id: 145, 
                    },
                ]
            },
            {
                name: '灾害经济损失评估',
                code: 'A5',
                id: 15,
                children: [
                    {
                        name: '灾害的界定和分类体系',
                        code: 'A5-1',
                        id: 151,
                    },
                    {
                        name: '灾害损失的经济学分析',
                        code: 'A5-2',
                        id: 152,
                    },
                    {
                        name: '灾害经济的评价方法',
                        code: 'A5-3',
                        id: 153,
                    },
                    {
                        name: '灾害经济损失的评估方法',
                        code: 'A5-4',
                        id: 154,
                    },
                ],
            },
            {
                name: '应急与危机心理干预',
                code: 'A6',
                id: 16,
                children: [
                    {
                        name: '危机心理干预概述',
                        code: 'A6-1',
                        id: 161, 
                    },
                    {
                        name: '基础心理学',
                        code: 'A6-2',
                        id: 162, 
                    },
                    {
                        name: '突发事件危机心理干预的过程与内容',
                        code: 'A6-3',
                        id: 163, 
                    },
                    {
                        name: '危机事件与心理危机',
                        code: 'A6-4',
                        id: 164, 
                    },
                    {
                        name: '危机心理干预的评估与诊断技术',
                        code: 'A6-5',
                        id: 165,
                    },
                ],
            },
        ],
    },
    {
        name: '地质灾害预防及处置',
        code: 'B',
        id: 2,
        sort: 8,
        children: [
            {
                name: '地质灾害辨识',
                code: 'B1',
                id: 21,
                children: [
                    {
                        name: '泥石流灾害的成因与防治',
                        code: 'B1-1',
                        id: 211, 
                    },
                    {
                        name: '滑坡灾害的成因与防治',
                        code: 'B1-2',
                        id: 212, 
                    },
                    {
                        name: '崩塌灾害的成因与防治',
                        code: 'B1-3',
                        id: 213, 
                    },
                ]
            },
            {
                name: '地质灾害风险分级与管控',
                code: 'B2',
                id: 22,
                children: [
                    {
                        name: '地质灾害风险分级',
                        code: 'B2-1',
                        id: 221, 
                    },
                    {
                        name: '地质灾害风险管控',
                        code: 'B2-2',
                        id: 222, 
                    },
                ],
            },
            {
                name: '地质灾害隐患排查与治理',
                code: 'B3',
                id: 23,
                children: [
                    {
                        name: '地质灾害隐患排查',
                        code: 'B3-1',
                        id: 231, 
                    },
                    {
                        name: '地质灾害隐患治理',
                        code: 'B3-2',
                        id: 232, 
                    },
                ],
            },
            {
                name: '地质灾害应急资源配置与应急演练',
                code: 'B4',
                id: 24,
                children: [
                    {
                        name: '地质灾害应急资源调查与配置',
                        code: 'B4-1',
                        id: 241,
                    },
                    {
                        name: '地质灾害预案编制与演练',
                        code: 'B4-2',
                        id: 242,
                    },
                ],
            },
            {
                name: '地质灾害监测及预警',
                code: 'B5',
                id: 25,
                children: [
                    {
                        name: '地质灾害监测技术',
                        code: 'B5-1',
                        id: 251,
                    },
                    {
                        name: '地质灾害监测预警',
                        code: 'B5-2',
                        id: 252,
                    },
                ],
            },
            {
                name: '地质灾害避险及撤离',
                code: 'B6',
                id: 26,
                children: [
                    {
                        name: '典型地质灾害的应急避险与逃生',
                        code: 'B6-1',
                        id: 261,
                    },
                    {
                        name: '地质灾害指挥与决策',
                        code: 'B6-2',
                        id: 262,
                    },
                ],
            },
            {
                name: '典型地质灾害案例分析',
                code: 'B7',
                id: 27,
                children: [
                    {
                        name: '地质灾害典型案例分析',
                        code: 'B7-1',
                        id: 271, 
                    }
                ],
            },
        ]
    },
    {
        name: '洪水灾害预防及处置',
        code: 'C',
        id: 3,
        sort: 5,
        children: [
            {
                name: '气象、水情测预报、水库调度',
                code: 'C1',
                id: 31,
                children: [
                    {
                        name: '水情监测',
                        code: 'C1-1',
                        id: 311, 
                    },
                    {
                        name: '水情数据应用',
                        code: 'C1-2',
                        id: 312, 
                    },
                    {
                        name: '水库调度',
                        code: 'C1-3',
                        id: 313, 
                    },
                ]
            },
            {
                name: '防洪应急资源配置与应急演练',
                code: 'C2',
                id: 32,
                children: [
                    {
                        name: '防洪应急资源调查与配置',
                        code: 'C2-1',
                        id: 321, 
                    },
                    {
                        name: '防洪预案编制与演练',
                        code: 'C2-2',
                        id: 322, 
                    },
                ],
            },
            {
                name: '汛前防洪准备',
                code: 'C3',
                id: 33,
                children: [
                    {
                        name: '大坝安全监测与分析',
                        code: 'C3-1',
                        id: 331, 
                    },
                    {
                        name: '水库及水工建筑物巡检',
                        code: 'C3-2',
                        id: 332, 
                    },
                ]
            },
            {
                name: '行洪安全',
                code: 'C4',
                id: 34,
                children: [
                    {
                        name: '行洪安全联动机制与预警',
                        code: 'C4-1',
                        id: 341, 
                    },
                ]
            },
            {
                name: '防洪应急抢险',
                code: 'C5',
                id: 35,
                children: [
                    {
                        name: '典型洪水灾害的应急避险与逃生',
                        code: 'C5-1',
                        id: 351, 
                    },
                    {
                        name: '防洪指挥与决策',
                        code: 'C5-2',
                        id: 352, 
                    },
                ],
            },
            {
                name: '灾后检查与恢复',
                code: 'C6',
                id: 36,
                children: [
                    {
                        name: '灾后恢复案例分析',
                        code: 'C6-1',
                        id: 361, 
                    },
                ]
            },
            {
                name: '典型洪水灾害案例分析',
                code: 'C7',
                id: 37,
                children: [

                    {
                        name: '洪水灾害典型案例分析',
                        code: 'C7-1',
                        id: 371, 
                    },
                ]
            },
        ]
    },
    {
        name: '水淹厂房事故预防及处置',
        code: 'D',
        id: 4,
        sort: 7,
        children: [
            {
                name: '水淹厂房风险因素分析',
                code: 'D1',
                id: 41,
                children: [
                    {
                        name: '水淹厂房风险因素',
                        code: 'D1-1',
                        id: 411, 
                    },
                    {
                        name: '水淹厂房风险辨识',
                        code: 'D1-2',
                        id: 412, 
                    },
                    {
                        name: '水淹厂房风险分级',
                        code: 'D1-3',
                        id: 413, 
                    },
                ]
            },
            {
                name: '防水淹厂房设备及预警',
                code: 'D2',
                id: 42,
                children: [
                    {
                        name: '防水淹厂房监测设施及控制系统',
                        code: 'D2-1',
                        id: 421, 
                    },
                    {
                        name: '防洪闸门种类及操作方法',
                        code: 'D2-2',
                        id: 422, 
                    },
                    {
                        name: '水淹厂房预警系统流程',
                        code: 'D2-3',
                        id: 423, 
                    },
                    {
                        name: '防水淹厂房应急管理要求',
                        code: 'D2-4',
                        id: 424, 
                    },
                ]
            },
            {
                name: '防水淹厂房日常及专项检查',
                code: 'D3',
                id: 43,
                children: [
                    {
                        name: '水工建筑物运行及检查',
                        code: 'D3-1',
                        id: 431, 
                    },
                    {
                        name: '厂区上下游环境检查',
                        code: 'D3-2',
                        id: 432, 
                    },
                    {
                        name: '机电设备的检查与分析',
                        code: 'D3-3',
                        id: 433, 
                    },
                    {
                        name: '厂房排水系统的检查',
                        code: 'D3-4',
                        id: 434, 
                    },
                    {
                        name: '防水淹厂房检查准备及措施',
                        code: 'D3-5',
                        id: 435, 
                    },
                ]
            },
            {
                name: '水淹厂房事故预案编制及演练',
                code: 'D4',
                id: 44,
                children: [
                    {
                        name: '水淹厂房事故预案编制',
                        code: 'D4-1',
                        id: 441, 
                    },
                    {
                        name: '水淹厂房事故应急演练',
                        code: 'D4-2',
                        id: 442, 
                    },
                ]
            },
            {
                name: '水淹厂房事故避险及撤离',
                code: 'D5',
                id: 45,
                children: [
                    {
                        name: '典型水淹厂房灾害的应急避险与逃生',
                        code: 'D5-1',
                        id: 451, 
                    },
                    {
                        name: '逃生路线和避险点的设置及撤离前的应急措施',
                        code: 'D5-2',
                        id: 452, 
                    },
                    {
                        name: '水淹厂房指挥与决策',
                        code: 'D5-3',
                        id: 453, 
                    },
                ]
            },
            {
                name: '典型水淹厂房事故案例分析',
                code: 'D6',
                id: 46,
                children: [
                    {
                        name: '水淹厂房事故典型案例分析',
                        code: 'D6-1',
                        id: 461, 
                    },
                    {
                        name: '防水淹厂房能力提升',
                        code: 'D6-2',
                        id: 462, 
                    },
                ]
            },
        ]
    },
    {
        name: '溃坝事故预防及处置',
        code: 'E',
        id: 5,
        sort: 6,
        children: [
            {
                name: '大坝类型及溃坝成因',
                code: 'E1',
                id: 51,  
                children: [
                    {
                        name: '水工建筑物',
                        code: 'E1-1',
                        id: 511, 
                    },
                    {
                        name: '溃坝原因及溃决方式',
                        code: 'E1-2',
                        id: 512, 
                    },
                    {
                        name: '溃坝洪水演进',
                        code: 'E1-3',
                        id: 513, 
                    },
                ]
            },
            {
                name: '大坝运行及溃坝风险预控',
                code: 'E2',
                id: 52,  
                children: [
                    {
                        name: '大坝安全监测',
                        code: 'E2-1',
                        id: 521, 
                    },
                    {
                        name: '大坝定检',
                        code: 'E2-2',
                        id: 522, 
                    },
                    {
                        name: '水库运行方式',
                        code: 'E2-3',
                        id: 523, 
                    },
                    {
                        name: '大坝不安全因素分析',
                        code: 'E2-4',
                        id: 524, 
                    },
                ]
            },
            {
                name: '溃坝事故预案编制及演练',
                code: 'E3',
                id: 53,  
                children: [
                    {
                        name: '溃坝事故应急预案编制',
                        code: 'E3-1',
                        id: 531, 
                    },
                    {
                        name: '溃坝事故应急演练',
                        code: 'E3-2',
                        id: 532, 
                    },
                ]
            },
            {
                name: '溃坝事故应急处置',
                code: 'E4',
                id: 54,  
                children: [
                    {
                        name: '溃坝事故应急避险',
                        code: 'E4-1',
                        id: 541, 
                    },
                    {
                        name: '溃坝事故应急抢险',
                        code: 'E4-2',
                        id: 542, 
                    },
                    {
                        name: '溃坝事故指挥与决策',
                        code: 'E4-3',
                        id: 543, 
                    }
                ]
            },
            {
                name: '典型溃坝事故案例分析',
                code: 'E5',
                id: 55,
                children: [
                    {
                        name: '溃坝事故典型案例分析',
                        code: 'E5-1',
                        id: 551, 
                    }
                ]  
            },
        ]
    },
    {
        name: '火灾事故预防及处置',
        code: 'F',
        id: 6,
        sort: 9,
        children: [
            {
                name: '火灾概述及常见灭火方法',
                code: 'F1',
                id: 61,  
                children: [
                    {
                        name: '燃烧原理及火灾分类',
                        code: 'F1-1',
                        id: 611, 
                    },
                    {
                        name: '常见火灾起因分析',
                        code: 'F1-2',
                        id: 612, 
                    },
                    {
                        name: '一般火灾设备使用',
                        code: 'F1-3',
                        id: 613, 
                    },
                ]
            },
            {
                name: '消防设施的维护与管理',
                code: 'F2',
                id: 62,  
                children: [
                    {
                        name: '消防设施及其工作原理',
                        code: 'F2-1',
                        id: 621, 
                    },
                    {
                        name: '消防设施日常运维与管理',
                        code: 'F2-2',
                        id: 622, 
                    },
                    {
                        name: '水电厂消防检查与验收',
                        code: 'F2-3',
                        id: 623, 
                    },
                ]
            },
            {
                name: '火灾隐患排查',
                code: 'F3',
                id: 63,  
                children: [
                    {
                        name: '火灾隐患排查及风险评估',
                        code: 'F3-1',
                        id: 631, 
                    },
                    {
                        name: '水电厂重点防火部位防火措施',
                        code: 'F3-2',
                        id: 632, 
                    },
                    {
                        name: '火灾事故应急预案编制及演练',
                        code: 'F3-3',
                        id: 633, 
                    },
                ]
            },
            {
                name: '火灾事故应急处置',
                code: 'F4',
                id: 64,  
                children: [
                    {
                        name: '火灾报警与初起火灾扑救',
                        code: 'F4-1',
                        id: 641, 
                    },
                    {
                        name: '火灾逃生',
                        code: 'F4-2',
                        id: 642, 
                    }
                ]
            },
            {
                name: '森林草原火灾防治',
                code: 'F5',
                id: 65,  
                children: [
                    {
                        name: '森林草原火灾防治',
                        code: 'F5-1',
                        id: 651, 
                    }
                ]
            },
            {
                name: '典型电厂火灾事故案例分析',
                code: 'F6',
                id: 66,  
                children: [
                    {
                        name: '电厂火灾事故典型案例分析',
                        code: 'F6-1',
                        id: 661, 
                    }
                ]
            },
        ]
    },
    {
        name: '全厂失电事故预防及处置',
        code: 'G',
        id: 7,
        sort: 2,
        children: [
            {
                name: '厂用电配置及日常运维管理',
                code: 'G1',
                id: 71,  
                children: [
                    {
                        name: '厂用电源典型配置',
                        code: 'G1-1',
                        id: 711, 
                    },
                    {
                        name: '直流系统、UPS、柴油发电机配置及原理',
                        code: 'G1-2',
                        id: 712, 
                    },
                    {
                        name: '厂用电系统日常运维管理',
                        code: 'G1-3',
                        id: 713, 
                    },
                ]
            },
            {
                name: '全厂失电隐患排查及预控措施',
                code: 'G2',
                id: 72,  
                children: [
                    {
                        name: '黑启动概述',
                        code: 'G2-1',
                        id: 721, 
                    },
                    {
                        name: '全厂失电的原因及隐患排查',
                        code: 'G2-2',
                        id: 722, 
                    },
                    {
                        name: '全厂失电的预控措施',
                        code: 'G2-3',
                        id: 723, 
                    },
                    {
                        name: '黑启动方案编制',
                        code: 'G2-4',
                        id: 724, 
                    },
                ]
            },
            {
                name: '全厂失电事故处置',
                code: 'G3',
                id: 73,  
                children: [
                    {
                        name: '全厂失电事故处置原则',
                        code: 'G3-1',
                        id: 731, 
                    },
                    {
                        name: '低压厂用电系统基本操作',
                        code: 'G3-2',
                        id: 732, 
                    },
                    {
                        name: '厂用电系统全停后恢复操作',
                        code: 'G3-3',
                        id: 733, 
                    },
                    {
                        name: '水轮发电机组黑启动操作',
                        code: 'G3-4',
                        id: 734, 
                    },
                ]
            },
            {
                name: '全厂失电事故案例分析',
                code: 'G4',
                id: 74,  
                children: [
                    {
                        name: '全厂失电事故案例分析',
                        code: 'G4-1',
                        id: 741,
                    }
                ]
            },
        ]
    },
    {
        name: '地震灾害预防及处置',
        code: 'H',
        id: 8,
        sort: 4,
        children: [
            {
                name: '地震灾害特征及引发的次生灾害',
                code: 'H1',
                id: 81,
                children: [
                    {
                        name: '地震灾害的成因与预防',
                        code: 'H1-1',
                        id: 811, 
                    }
                ]
            },
            {
                name: '地震灾害应急资源调查与配置',
                code: 'H2',
                id: 82,
                children: [
                    {
                        name: '地震灾害应急资源调查与配置',
                        code: 'H2-1',
                        id: 821, 
                    },
                    {
                        name: '地震灾害预案编制与演练',
                        code: 'H2-2',
                        id: 822, 
                    },
                ]
            },
            {
                name: '地震灾害避险及撤离',
                code: 'H3',
                id: 83,
                children: [
                    {
                        name: '地震灾害应急避险与逃生',
                        code: 'H3-1',
                        id: 831, 
                    },
                    {
                        name: '地震灾害指挥与决策',
                        code: 'H3-2',
                        id: 832, 
                    },
                ]
            },
            {
                name: '地震灾后检查与恢复',
                code: 'H4',
                id: 84,
                children: [
                    {
                        name: '地震灾后恢复案例分析',
                        code: 'H4-1',
                        id: 841, 
                    }
                ]
            },
            {
                name: '“5.12”地震案例分析',
                code: 'H5',
                id: 85,
                children: [
                    {
                        name: '“5.12”地震遗址实地教学',
                        code: 'H5-1',
                        id: 851, 
                    },
                    {
                        name: '“5.12”地震案例分析',
                        code: 'H5-2',
                        id: 852, 
                    }
                ]
            },
        ]
    },
    {
        name: '冰冻灾害预防及处置',
        code: 'I',
        id: 9,
        sort: 3,
        children: [
            {
                name: '冰冻灾害成因分析及危害',
                code: 'I1',
                id: 91,  
                children: [
                    {
                        name: '冰冻灾害种类及其成因和危害',
                        code: 'I1-1',
                        id: 911,
                    },
                ]
            },
            {
                name: '冰冻灾害对电站安全生产影响分析与防范措施',
                code: 'I2',
                id: 92, 
                children: [
                    {
                        name: '水电站引水系统冰冻灾害分析',
                        code: 'I2-1',
                        id: 921, 
                    },
                    {
                        name: '输电线路覆冰灾害特征、影响及防范措施',
                        code: 'I2-2',
                        id: 922, 
                    },
                    {
                        name: '水电站室外管道、仪表设施防冰冻措施',
                        code: 'I2-3',
                        id: 923, 
                    },
                    {
                        name: '强暴风雪、冰川泥石流交通安全与事故规范',
                        code: 'I2-4',
                        id: 924, 
                    },
                ]
            },
            {
                name: '冰冻灾害应急资源配置与应急演练',
                code: 'I3',
                id: 93,
                children: [
                    {
                        name: '应急资源调查与配置',
                        code: 'I3-1',
                        id: 931, 
                    },
                    {
                        name: '冰冻灾害应急预案编制',
                        code: 'I3-2',
                        id: 932, 
                    },
                    {
                        name: '冰冻灾害应急演练',
                        code: 'I3-3',
                        id: 933, 
                    },
                ]
            },
            {
                name: '冰冻灾害处置',
                code: 'I4',
                id: 94,  
                children: [
                    {
                        name: '冰冻灾害应急避险',
                        code: 'I4-1',
                        id: 941, 
                    },
                    {
                        name: '冰冻灾害应急抢险',
                        code: 'I4-2',
                        id: 942, 
                    },
                    {
                        name: '冰冻灾害应急指挥与决策',
                        code: 'I4-3',
                        id: 943, 
                    },
                ]
            },
            {
                name: '典型冰冻灾害案例分析',
                code: 'I5',
                id: 95,  
                children: [
                    {
                        name: '冰冻灾害典型案例分析',
                        code: 'I5-1',
                        id: 951, 
                    }
                ]
            },
        ]
    },
    {
        name: '应急救援',
        code: 'J',
        id: 10,
        sort: 10,
        children: [
            {
                name: '山地（绳索）救援',
                code: 'J1',
                id: 101,
                children: [
                    {
                        name: '救援绳结打结技术',
                        code: 'J1-1',
                        id: 1011,
                    },
                    {
                        name: '登山装备的使用',
                        code: 'J1-2',
                        id: 1012,
                    },
                    {
                        name: '等高线地形图识别',
                        code: 'J1-3',
                        id: 1013,
                    },
                    {
                        name: '山地搜索基本方法',
                        code: 'J1-4',
                        id: 1014,
                    },
                    {
                        name: '绳索救援技术和常用装备的使用',
                        code: 'J1-5',
                        id: 1015,
                    },
                ]
            },
            {
                name: '水域搜索与救援',
                code: 'J2',
                id: 102, 
                children: [
                    {
                        name: '充气式无动力救援艇的技术指标和操作规程',
                        code: 'J2-1',
                        id: 1021,
                    },
                    {
                        name: '水域搜救中的个人防护',
                        code: 'J2-2',
                        id: 1022,
                    },
                    {
                        name: '游泳姿势及呼吸方法',
                        code: 'J2-3',
                        id: 1023,
                    },
                    {
                        name: '激流救援',
                        code: 'J2-4',
                        id: 1024,
                    },
                    {
                        name: '水域搜救现场评估',
                        code: 'J2-5',
                        id: 1025,
                    },
                ]
            },
            {
                name: '有限空间救援',
                code: 'J3',
                id: 103, 
                children: [
                    {
                        name: '便携式气体检测报警仪操作',
                        code: 'J3-1',
                        id: 1031,
                    },
                    {
                        name: '密闭空间的通风',
                        code: 'J3-2',
                        id: 1032,
                    },
                    {
                        name: '正压呼吸器使用方法',
                        code: 'J3-3',
                        id: 1033,
                    },
                    {
                        name: '破拆工具的使用与救援',
                        code: 'J3-4',
                        id: 1034,
                    },
                    {
                        name: '有限空间救援现场评估',
                        code: 'J3-5',
                        id: 1035,
                    },
                ]
            },
            {
                name: '伤员应急救治',
                code: 'J4',
                id: 104, 
                children: [
                    {
                        name: '伤员的检伤分类',
                        code: 'J4-1',
                        id: 1041,
                    },
                    {
                        name: '外伤止血与包扎',
                        code: 'J4-2',
                        id: 1042,
                    },
                    {
                        name: '骨折的现场判断与固定',
                        code: 'J4-3',
                        id: 1043,
                    },
                    {
                        name: '伤员固定的操作方法',
                        code: 'J4-4',
                        id: 1044,
                    },
                    {
                        name: '担架的组装与使用',
                        code: 'J4-5',
                        id: 1045,
                    },
                    {
                        name: '四肢离断伤的处置',
                        code: 'J4-6',
                        id: 1046,
                    },
                    {
                        name: '内脏脱出伤的处置',
                        code: 'J4-7',
                        id: 1047,
                    },
                    {
                        name: '刺入伤的处置',
                        code: 'J4-8',
                        id: 1048,
                    },
                    {
                        name: '冻伤、失温症、中暑等环境急症的现场处置',
                        code: 'J4-9',
                        id: 1049,
                    },
                    {
                        name: '心肺复苏操作方法',
                        code: 'J4-10',
                        id: 10410,
                    },
                    {
                        name: '自动体外除颤仪（AED）的使用',
                        code: 'J4-11',
                        id: 10411,
                    },
                ]
            },
            {
                name: '逃生与避险',
                code: 'J5',
                id: 105, 
                children: [
                    {
                        name: '常见突发事件的避险与逃生',
                        code: 'J5-1',
                        id: 1051,
                    },
                    {
                        name: '防护装备的使用',
                        code: 'J5-2',
                        id: 1052,
                    },
                    {
                        name: '应急逃生器材的使用',
                        code: 'J5-3',
                        id: 1053,
                    },
                ]
            },
        ]
    },
];

export function generatePageName(name: string) {
    return `${name} - ${APP_NAME}`;
}
