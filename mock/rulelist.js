const ruleList = {
  data:{
    rules:[
      {id: "5c10a7728ffaed7393c4026f", bid: "591480926fb3a6a6d5c5174b", name: "咨询产品价格", speakerType: ""},
      {id: "5c10a7758ffaed7393c40270", bid: "591480926fb3a6a6d5c5174b", name: "咨询产品内容", speakerType: ""},
      {id: "5c10a7788ffaed7393c40271", bid: "591480926fb3a6a6d5c5174b", name: "问会员价格", speakerType: ""},
      {id: "5c10a77b8ffaed7393c40272", bid: "591480926fb3a6a6d5c5174b", name: "产品异议", speakerType: ""},
      {id: "5c10a77e8ffaed7393c40273", bid: "591480926fb3a6a6d5c5174b", name: "拖延", speakerType: ""},
      {id: "5c10a7828ffaed7393c40274", bid: "591480926fb3a6a6d5c5174b", name: "个人的车", speakerType: ""},
      {id: "5c10a7858ffaed7393c40275", bid: "591480926fb3a6a6d5c5174b", name: "价格异议", speakerType: ""},
      {id: "5c10a7888ffaed7393c40276", bid: "591480926fb3a6a6d5c5174b", name: "不想花钱", speakerType: ""},
      {id: "5c10a78b8ffaed7393c40277", bid: "591480926fb3a6a6d5c5174b", name: "问优惠", speakerType: ""},
      {id: "5c10a78e8ffaed7393c40278", bid: "591480926fb3a6a6d5c5174b", name: "问支付方式", speakerType: ""},
      {id: "5c10a7918ffaed7393c40279", bid: "591480926fb3a6a6d5c5174b", name: "不需要", speakerType: ""},
      {id: "5c10a7978ffaed7393c4027b", bid: "591480926fb3a6a6d5c5174b", name: "做过其他平台", speakerType: ""},
      {id: "5c10a79a8ffaed7393c4027c", bid: "591480926fb3a6a6d5c5174b", name: "小程序", speakerType: ""},
      {id: "5c10a79d8ffaed7393c4027d", bid: "591480926fb3a6a6d5c5174b", name: "VIP", speakerType: ""},
      {id: "5c10a7a08ffaed7393c4027e", bid: "591480926fb3a6a6d5c5174b", name: "站外推广", speakerType: ""},
      {id: "5c10a7a38ffaed7393c4027f", bid: "591480926fb3a6a6d5c5174b", name: "加微信", speakerType: ""},
      {id: "5c10a7a68ffaed7393c40280", bid: "591480926fb3a6a6d5c5174b", name: "近期联系", speakerType: ""},
      {id: "5c10a7a98ffaed7393c40281", bid: "591480926fb3a6a6d5c5174b", name: "已邀约", speakerType: ""},
      {id: "5c6f65c6617ffd098cfb665a", bid: "591480926fb3a6a6d5c5174b", name: "空白通时", speakerType: ""},
      {id: "5c72517a617ffd098c377e02", bid: "591480926fb3a6a6d5c5174b", name: "竞品提及", speakerType: ""},
      {id: "5d5647d3a012914ae8312c93", bid: "591480926fb3a6a6d5c5174b", name: "咨询产品价格", speakerType: ""},
      {id: "5d5647d3a012914ae8312c9b", bid: "591480926fb3a6a6d5c5174b", name: "咨询产品内容", speakerType: ""},
      {id: "5d5647d3a012914ae8312c9d", bid: "591480926fb3a6a6d5c5174b", name: "问会员价格", speakerType: ""},
      {id: "5d5647d3a012914ae8312c9f", bid: "591480926fb3a6a6d5c5174b", name: "产品异议", speakerType: ""},
      {id: "5d5647d3a012914ae8312ca2", bid: "591480926fb3a6a6d5c5174b", name: "拖延", speakerType: ""},
    ]
  }
};


const ruleGroup = {
  code: 0,
  data: {
    rule_group: {

      default: true,
      name: '标题 - 业务类型',
      qualifiedScore: 60,
      benchmarkScore: 20,	
      goodRules: [
        {ruleId: "5c10a7728ffaed7393c4026f", ruleName: "咨询产品价格", score: 1},
        {ruleId: "5c10a77b8ffaed7393c40272", ruleName: "产品异议", score: 1},
        {ruleId: "5c10a77e8ffaed7393c40273", ruleName: "拖延", score: 0},
        {ruleId: "5c10a7828ffaed7393c40274", ruleName: "个人的车", score: 0},
        {ruleId: "5c10a7858ffaed7393c40275", ruleName: "价格异议", score: 0},
        {ruleId: "5c10a7888ffaed7393c40276", ruleName: "不想花钱", score: 0},
        {ruleId: "5c10a78b8ffaed7393c40277", ruleName: "问优惠", score: 5},
      ],
      badRules:[
        {ruleId: "5c10a7758ffaed7393c40270", ruleName: "咨询产品内容", score: 5},
        {ruleId: "5c10a7788ffaed7393c40271", ruleName: "问会员价格", score: 5},
        {ruleId: "5c10a7978ffaed7393c4027b", ruleName: "做过其他平台", score: 0},
      ]
    }
  }
}


export default {
  'GET /api/v8/rule/list': (req,res) => {
    setTimeout(() => {
      res.send(ruleList);
    }, 1000);
  },
  'GET /api/v8/rule/group': (req,res) => {
    setTimeout(() => {
      res.send(ruleGroup);
    }, 1000);
  }
}