
import * as mockService from '../services/mock';

export default {
  namespace: 'mocks',
  state: {
    name:'mocks'
  },
  reducers:{},
  effects:{
    *test({ payload,callback }, { call, put }) {
        const data = yield call(mockService.test, payload);
        if (callback) callback(data);
    },
  }
}