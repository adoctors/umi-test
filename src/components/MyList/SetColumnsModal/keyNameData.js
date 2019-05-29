export default {
  customers:[
    {
      title:'姓名',
      key:'name',
    },
    {
      title:'手机号',
      key:'phone',
    },
    {
      title:'跟进人',
      key:'staffs',
    },
    {
      title:'客户ID',
      key:'customerId',
    },
    {
      title:'销售阶段',
      key:'saleStage',
    },
    {
      title:'下次跟进',
      key:'nextFollow',
    },
    {
      title:'最新跟进时间',
      key:'lastTime',
    },
    {
      title:'累计通话时长',
      key:'callLenSum',
    },
    {
      title:'客户画像',
      key:'cEntities',
    },
    {
      title:'话术标签',
      key:'sEntities',
    },
    {
      title:'跟进次数',
      key:'callHistoryTimes',
    },
    {
      title:'客户详情',
      key:'customerUrl',
    },
    {
      title:'录音类型',
      key:'ruleGroups',
    },
  ],
  calls:[
    {
      title:'电话名',
      key:'title',
    },
    {
      title:'日期',
      key:'startTime',
    },
    {
      title:'销售',
      key:'sname',
    },
    {
      title:'长度',
      key:'length',
    },
    {
      title:'画像概述',
      key:'entities',
    },
    {
      title:'手机号',
      key:'number',
    },
    {
      title:'客户名称',
      key:'cname',
    },
    {
      title:'客户ID',
      key:'cid',
    },
    {
      title:'下次跟进',
      key:'nextFollow',
    },
    {
      title:'客户详情',
      key:'customerUrl',
    },
    {
      title:'销售阶段',
      key:'saleStage',
    },
    {
      title:'录音类型',
      key:'ruleGroup',
    },
    {
      title:'质检结果',
      key:'verify',
    },
    {
      title:'质检评分',
      key:'score',
    },
  ]
}

// 后端相关逻辑，可做参照
// TabAllShowColumns = map[string]ShowColumnsCols{
//   "customers": {
//       "name", "phone", "staffs", "customerId", "saleStage",
//       "nextFollow", "lastTime", "callLenSum", "cEntities", "sEntities",
//       "callHistoryTimes", "customerUrl", "ruleGroups",
//   },
//   "calls": {
//       "title", "startTime", "sname", "length", "entities",
//       "number", "cname", "cid", "nextFollow", "customerUrl",
//       "saleStage", "ruleGroup", "verify", "score",
//   },
// }
// TabRequiredShowColumns = map[string]map[string]ShowColumnsCols{
//   "customers": {},
//   "calls":     {"": {"entities"}},
// }
// TabDefaultShowColumns = map[string]map[string]ShowColumnsCols{
//   "customers": {
//       "all": {
//           "name", "phone", "staffs", "nextFollow", "lastTime", "callLenSum",
//           "cEntities", "sEntities", "customerUrl",
//       },
//       "yesterdayDone": {
//           "name", "phone", "staffs", "nextFollow", "callLenSum",
//           "cEntities", "sEntities", "customerUrl",
//       },
//       "today": {
//           "name", "phone", "staffs", "nextFollow", "customerUrl",
//       },
//   },
//   "calls": {
//       "": {
//           "title", "startTime", "sname", "length", "entities",
//       },
//   },
// }