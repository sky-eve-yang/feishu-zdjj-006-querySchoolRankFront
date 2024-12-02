import { basekit, FieldType, field, FieldComponent, FieldCode, NumberFormatter, AuthorizationType } from '@lark-opdev/block-basekit-server-api';
const { t } = field;

// 通过addDomainList添加请求接口的域名
basekit.addDomainList(['feishu-legerank-ikiqloixhl.cn-hongkong.fcapp.run']);

basekit.addField({
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
        "help_document":  '点击查看说明文档',
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
      component: FieldComponent.FieldSelect,
      
      props: {
        placeholder: t('placeholderUniverse'),
        supportType: [FieldType.SingleSelect, FieldType.Text],

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
      component: FieldComponent.FieldSelect,
      props: {
        placeholder: t('placeholderMajor'),
        supportType: [FieldType.SingleSelect, FieldType.Text],

      },
      validator: {
        required: false,
      }
    },
  ],
  // 定义捷径的返回结果类型
  resultType: {
    type: FieldType.Object,
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
          type: FieldType.Text,
          title: 'id',
          hidden: true,
        },
        {
          key: 'domesticUniversityRanking',
          type: FieldType.Number,
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
          type: FieldType.MultiSelect
        },
        {
          key: 'domesticMajorRanking',
          type: FieldType.Number,
          title: t('domesticMajorRanking')
        },
        {
          key: 'domesticMajorRating',
          title: t('domesticMajorRating'),
          extra: {
              options: [// 预设选项，
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
          type: FieldType.SingleSelect,
        },
      ]
    }
  },
  execute:  async (formItemParams, context) => {
    const { universe, major } = formItemParams;
    console.log("universe", universe)
    let university_name = universe[0].text || universe
    console.log("major", major)
    let major_name = ""

    if (major) 
      major_name = major[0].text || major
    
    console.log("university_name", university_name, typeof university_name)
    console.log("major_name", major_name, typeof major_name)
    
    const params = {
      university_name,
      major: major_name
    };
    console.log("params", params)
    
    try {
      const res = await context.fetch(`https://feishu-legerank-ikiqloixhl.cn-hongkong.fcapp.run/query_university`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }).then(res => res.json());
      console.log(res)
      
      let domesticMajorRankingValue = major_name ? ( Number(res.info_major.rank) || -1) : ""
      let domesticMajorRatingValue = major_name ? res.info_major.grade : []

      return {
        code: FieldCode.Success,
        data: {
          id: `${Math.random()}`,
          domesticUniversityRanking: Number(res.college_rank.rank) || -1,
          domesticUniversityIdentifier: res.college_tags,
          domesticMajorRanking: domesticMajorRankingValue,
          domesticMajorRating: domesticMajorRatingValue
        } 
      };
    } catch (e) {
      console.log(e)
      return {
        code: FieldCode.Error,
        msg: e
      };
    }
  },
});
export default basekit;