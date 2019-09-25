
import {requestApi} from '../APITest/request';

export default {
  namespace: 'tests',
  state: {
    name:'tests',
    RuleGroup:{},
    allRules:[],
    selectRules:[],
  },
  effects:{
    *fecth({ payload,callback }, { call, put }) {
      const data = yield call(requestApi, payload);
      if (callback) callback(data);
    },
    *getRuleGroup({ payload, callback }, { call, put }) {
      const { data } = yield call( requestApi, payload );
      const { rule_group } = data.data;
      const selectRules = [...rule_group.badRules, ...rule_group.goodRules];
      // console.log({ rule_group, selectRules})
      yield put({
        type: 'save',
        payload: { RuleGroup: rule_group, selectRules},
      });
      callback && callback(rule_group);

    },
    *getAllRules({ payload,callback }, { call, put }) {
      const data = yield call(requestApi, payload);
      if (callback) callback(data);
    },
  },
  reducers:{
    save(state: any, { payload = {} }) {
      return { ...state, ...payload };
    },
  },
}