export default {
	"data": {
		"headers": [{
				"key": "customerId",
				"type": "plaintext",
				"index": "",
				"visible": true,
				"name": "客户ID",
				"searchEnabled": true,
				"props": {
					"type": "serach"
				}
			},
			{
				"key": "saleStage",
				"type": "plaintext",
				"index": "",
				"visible": true,
				"name": "销售阶段",
				"searchEnabled": false,
				"props": {}
			},
			{
				"key": "callHistoryTimes",
				"type": "plaintext",
				"index": "",
				"visible": true,
				"name": "跟进次数",
				"searchEnabled": false,
				"props": {}
			},
			{
				"key": "ruleGroupType",
				"type": "plaintext",
				"index": "",
				"visible": true,
				"name": "录音类型",
				"searchEnabled": true,
				"props": {
					"type": "list",
					"searchItems": [{
						"name": "默认分类",
						"id": "5c132b1544f9c00001007b2f",
						"key": "ruleGroupId"
					}, {
						"name": "xx银行",
						"id": "5ca17dea62a3ae7d80f8b04f",
						"key": "ruleGroupId"
					}, {
						"name": "银行业务",
						"id": "5ca1b5e2c5ac1900015adf39",
						"key": "ruleGroupId"
					}]
				}
			},
			{
				"key": "name",
				"type": "plaintext",
				"index": "",
				"visible": true,
				"name": "姓名",
				"searchEnabled": false,
				"props": {}
			},
			{
				"key": "phone",
				"type": "plaintext",
				"index": "",
				"visible": true,
				"name": "手机号",
				"searchEnabled": false,
				"props": {}
			},
			{
				"key": "staff",
				"type": "plaintext",
				"index": "",
				"visible": true,
				"name": "跟进人",
				"searchEnabled": true,
				"props": {
					"type": "staff"
				}
			},
			{
				"key": "nextFollowEntity",
				"type": "highlight",
				"index": "",
				"visible": true,
				"name": "下次跟进",
				"searchEnabled": true,
				"props": {
					"type": "date"
				}
			},
			{
				"key": "lastTime",
				"type": "date",
				"index": "",
				"visible": true,
				"name": "最新跟进时间",
				"searchEnabled": false,
				"props": {}
			},
			{
				"key": "callLenSum",
				"type": "plaintext",
				"index": "",
				"visible": true,
				"name": "累计通话时长",
				"searchEnabled": false,
				"props": {}
			},
			{
				"key": "cEntities",
				"type": "label",
				"index": "",
				"visible": true,
				"name": "客户画像",
				"searchEnabled": true,
				"props": {
					"type": "list",
					"searchItems": [{
						"id": "5ca42ce0a4bf8d6dced4cd7b",
						"name": "明确时间提醒",
						"key": "entities"
					},{
						"id": "5ca42ce0a4bf8d6dced4cd83",
						"name": "晚点儿提醒",
						"key": "entities"
					}]
				}
			},
			{
				"key": "sEntities",
				"type": "label",
				"index": "",
				"visible": true,
				"name": "话术标签",
				"searchEnabled": false,
				"props": {}
			},
			{
				"key": "customerUrl",
				"type": "link",
				"index": "",
				"visible": true,
				"name": "客户详情",
				"searchEnabled": false,
				"props": {}
			},
			{
				"key": "Id",
				"type": "hide",
				"index": "",
				"visible": false,
				"name": "Id",
				"searchEnabled": false,
				"props": {}
			}
		]
	}
}
