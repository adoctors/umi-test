import Mock from 'mockjs';

const defaultRulesData = {
  code: 0,
  data: {
    rule_group: {

      default: true,
      name: '业务类型',
      qualifiedScore: 60,
      benchmarkScore: 20,	
      goodRules: [
        {ruleId: "5c10a7728ffaed7393c4026f", ruleName: "咨询产品价格", score: 1},
        // {ruleId: "5c10a7758ffaed7393c40270", ruleName: "咨询产品内容", score: 5},
        // {ruleId: "5c10a7788ffaed7393c40271", ruleName: "问会员价格", score: 5},
        {ruleId: "5c10a77b8ffaed7393c40272", ruleName: "产品异议", score: 1},
        {ruleId: "5c10a77e8ffaed7393c40273", ruleName: "拖延", score: 0},
        {ruleId: "5c10a7828ffaed7393c40274", ruleName: "个人的车", score: 0},
        {ruleId: "5c10a7858ffaed7393c40275", ruleName: "价格异议", score: 0},
        {ruleId: "5c10a7888ffaed7393c40276", ruleName: "不想花钱", score: 0},
        {ruleId: "5c10a78b8ffaed7393c40277", ruleName: "问优惠", score: 5},
      ],
      badRules:[
        {ruleId: "5ca42ce0a4bf8d6dced4cd7b", ruleName: "明确时间提醒", score: 0},
        {ruleId: "5ca42ce0a4bf8d6dced4cd83", ruleName: "晚点儿提醒", score: 0},
        {ruleId: "5c10a7978ffaed7393c4027b", ruleName: "做过其他平台", score: 0},
      ]
    }
  }
  
  
  
}

export default {
  'GET /api/v8/rule/group': (req,res) => {
    setTimeout(() => {
      res.send(defaultRulesData);
    }, 1000);
  }
}