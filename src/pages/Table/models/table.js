
import * as tableService from '../services/table';

export default {
  namespace: 'table',
  state: {
    name:'table'
  },
  reducers:{},
  effects:{
    *getTableData({ payload,callback }, { call, put }) {
      const data = yield call(tableService.getTableData, payload);
      if (callback) callback(data);
    },
    *getTableDataPage({ payload,callback }, { call, put }) {
      const data = yield call(tableService.getTableDataPage, payload);
      if (callback) callback(data);
    },
  }
}