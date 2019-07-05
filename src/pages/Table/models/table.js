
import * as tableService from '../services/table';

import {requestApi} from '../../../utils/utils'

export default {
  namespace: 'table',
  state: {
    name:'table',
    message:' from table models'
  },
  reducers:{},
  effects:{
    *fetchData({ payload, successCallback, failCallback }, { call, put }) {
      const reducerName=payload.reducerName||null;      // 获取对应reducerName
      if(reducerName){
        delete payload.reducerName;
      }
      const { data } = yield call(requestApi, payload);
      if(reducerName){              // 如果有reducer相关逻辑
        yield put({ type: reducerName, payload: data.data });
      }

      if (data.success) {
        successCallback && successCallback(data.data);
      } else {
        const errMsg = data.message || data.errMsg || data.code;
        failCallback && failCallback(errMsg);
      }
    },


    *getTableData({ payload,callback }, { call, put }) {
      const data = yield call(requestApi, payload);
      if (callback) callback(data);
    },
    *getTableDataPage({ payload,callback }, { call, put }) {
      const data = yield call(tableService.getTableDataPage, payload);
      if (callback) callback(data);
    },
  }
}