"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const { t } = block_basekit_server_api_1.field;
// 通过addDomainList添加请求接口的域名
block_basekit_server_api_1.basekit.addDomainList(['feishu-legerank-ikiqloixhl.cn-hongkong.fcapp.run']);
block_basekit_server_api_1.basekit.addField({
    // 定义捷径的i18n语言资源
    i18n: {
        messages: {
            'zh-CN': {
                'universe': '高校全称',
                'major': '专业全称',
                "placeholderUniverse": "请选择高校全称对应的字段 [文本类型或单选类型]",
                "placeholderMajor": "请选择专业全称对应的字段 [文本类型或单选类型]",
                "domesticUniversityRanking": "国内大学排名",
                "domesticUniversityIdentifier": "国内大学标识",
                "domesticMajorRanking": "国内专业排名",
                "domesticMajorRating": "国内专业评级",
                "help_document": '点击查看说明文档',
            },
            'en-US': {
                'universe': 'UniversityFullName',
                'major': 'MajorFullName',
                "placeholderUniverse": "Please select the corresponding field for the university full name [Text type or Single-select type]",
                "placeholderMajor": "Please select the corresponding field for the major full name [Text type or Single-select type]",
                "domesticUniversityRanking": "DomesticUniversityRanking",
                "domesticUniversityIdentifier": "DomesticUniversityIdentifier",
                "domesticMajorRanking": "DomesticMajorRating",
                "domesticMajorRating": "DomesticMajorRanking",
                'help_document': 'Click here to view the documentation',
            },
            'ja-JP': {
                'universe': '大学のフルネーム',
                'major': '学部のフルネーム',
                "placeholderUniverse": "大学のフルネームに対応するフィールドを選択してください [テキストタイプまたはシングルセレクトタイプ]",
                "placeholderMajor": "学部のフルネームに対応するフィールドを選択してください [テキストタイプまたはシングルセレクトタイプ]",
                "domesticUniversityRanking": "国内大学ランキング",
                "domesticUniversityIdentifier": "国内大学識別子",
                "domesticMajorRanking": "国内学部評価",
                "domesticMajorRating": "国内学部ランキング",
                'help_document': 'ドキュメントを表示するにはここをクリックしてください',
            },
        }
    },
    // 定义捷径的入参
    formItems: [
        {
            key: 'universe',
            label: t('universe'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                placeholder: t('placeholderUniverse'),
                supportType: [block_basekit_server_api_1.FieldType.SingleSelect, block_basekit_server_api_1.FieldType.Text],
            },
            validator: {
                required: true,
            },
            tooltips: [
                {
                    type: 'link',
                    text: t('help_document'),
                    'link': 'https://jfsq6znqku.feishu.cn/wiki/FKURwF0FqiXChGkgM0AcFxgsnVc?fromScene=spaceOverview'
                }
            ]
        },
        {
            key: 'major',
            label: t('major'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                placeholder: t('placeholderMajor'),
                supportType: [block_basekit_server_api_1.FieldType.SingleSelect, block_basekit_server_api_1.FieldType.Text],
            },
            validator: {
                required: false,
            }
        },
    ],
    // 定义捷径的返回结果类型
    resultType: {
        type: block_basekit_server_api_1.FieldType.Object,
        extra: {
            icon: {
                light: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/abjayvoz/ljhwZthlaukjlkulzlp/2024q3/telephone.svg?x-resource-account=public',
            },
            tips: {
                imageUrl: {
                    light: "https://test-wby-bucket.oss-cn-beijing.aliyuncs.com/zdjj-006-gxpm-v3.png"
                },
                desc: "👆 扫码加入交流群"
            },
            properties: [
                {
                    key: 'id',
                    isGroupByKey: true,
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: 'id',
                    hidden: true,
                },
                {
                    key: 'domesticUniversityRanking',
                    type: block_basekit_server_api_1.FieldType.Number,
                    title: t('domesticUniversityRanking'),
                    primary: true
                },
                {
                    key: 'domesticUniversityIdentifier',
                    title: t('domesticUniversityIdentifier'),
                    extra: {
                        options: [
                            // 预设的选项
                            {
                                name: '985'
                            },
                            {
                                name: '211'
                            },
                            {
                                name: 'Top2'
                            },
                            {
                                name: '双一流'
                            },
                            {
                                name: "C9"
                            },
                            {
                                name: "普通高校"
                            }
                        ]
                    },
                    type: block_basekit_server_api_1.FieldType.MultiSelect
                },
                {
                    key: 'domesticMajorRanking',
                    type: block_basekit_server_api_1.FieldType.Number,
                    title: t('domesticMajorRanking')
                },
                {
                    key: 'domesticMajorRating',
                    title: t('domesticMajorRating'),
                    extra: {
                        options: [
                            { name: 'A+' },
                            { name: 'A' },
                            { name: 'A-' },
                            { name: 'B+' },
                            { name: 'B' },
                            { name: 'B-' },
                            { name: 'C+' },
                            { name: 'C' },
                            { name: 'C-' },
                            { name: '未收录' },
                            { name: '未找到专业，请输入全称' },
                        ]
                    },
                    type: block_basekit_server_api_1.FieldType.SingleSelect,
                },
            ]
        }
    },
    execute: async (formItemParams, context) => {
        const { universe, major } = formItemParams;
        console.log("universe", universe);
        let university_name = universe[0].text || universe;
        console.log("major", major);
        let major_name = "";
        if (major)
            major_name = major[0].text || major;
        console.log("university_name", university_name, typeof university_name);
        console.log("major_name", major_name, typeof major_name);
        const params = {
            university_name,
            major: major_name
        };
        console.log("params", params);
        try {
            const res = await context.fetch(`https://feishu-legerank-ikiqloixhl.cn-hongkong.fcapp.run/query_university`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            }).then(res => res.json());
            console.log(res);
            let domesticMajorRankingValue = major_name ? (Number(res.info_major.rank) || -1) : "";
            let domesticMajorRatingValue = major_name ? res.info_major.grade : [];
            return {
                code: block_basekit_server_api_1.FieldCode.Success,
                data: {
                    id: `${Math.random()}`,
                    domesticUniversityRanking: Number(res.college_rank.rank) || -1,
                    domesticUniversityIdentifier: res.college_tags,
                    domesticMajorRanking: domesticMajorRankingValue,
                    domesticMajorRating: domesticMajorRatingValue
                }
            };
        }
        catch (e) {
            console.log(e);
            return {
                code: block_basekit_server_api_1.FieldCode.Error,
                msg: e
            };
        }
    },
});
exports.default = block_basekit_server_api_1.basekit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBZ0o7QUFDaEosTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLGdDQUFLLENBQUM7QUFFcEIsMkJBQTJCO0FBQzNCLGtDQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsa0RBQWtELENBQUMsQ0FBQyxDQUFDO0FBRTVFLGtDQUFPLENBQUMsUUFBUSxDQUFDO0lBQ2YsZ0JBQWdCO0lBQ2hCLElBQUksRUFBRTtRQUNKLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRTtnQkFDUCxVQUFVLEVBQUUsTUFBTTtnQkFDbEIsT0FBTyxFQUFFLE1BQU07Z0JBQ2YscUJBQXFCLEVBQUUsMEJBQTBCO2dCQUNqRCxrQkFBa0IsRUFBRSwwQkFBMEI7Z0JBQzlDLDJCQUEyQixFQUFFLFFBQVE7Z0JBQ3JDLDhCQUE4QixFQUFFLFFBQVE7Z0JBQ3hDLHNCQUFzQixFQUFFLFFBQVE7Z0JBQ2hDLHFCQUFxQixFQUFFLFFBQVE7Z0JBQy9CLGVBQWUsRUFBRyxVQUFVO2FBQzdCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLFVBQVUsRUFBRSxvQkFBb0I7Z0JBQ2hDLE9BQU8sRUFBRSxlQUFlO2dCQUN4QixxQkFBcUIsRUFBRSxzR0FBc0c7Z0JBQzdILGtCQUFrQixFQUFFLGlHQUFpRztnQkFDckgsMkJBQTJCLEVBQUUsMkJBQTJCO2dCQUN4RCw4QkFBOEIsRUFBRSw4QkFBOEI7Z0JBQzlELHNCQUFzQixFQUFFLHFCQUFxQjtnQkFDN0MscUJBQXFCLEVBQUUsc0JBQXNCO2dCQUM3QyxlQUFlLEVBQUUsc0NBQXNDO2FBQ3hEO1lBRUQsT0FBTyxFQUFFO2dCQUNQLFVBQVUsRUFBRSxVQUFVO2dCQUN0QixPQUFPLEVBQUUsVUFBVTtnQkFDbkIscUJBQXFCLEVBQUUscURBQXFEO2dCQUM1RSxrQkFBa0IsRUFBRSxxREFBcUQ7Z0JBQ3pFLDJCQUEy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