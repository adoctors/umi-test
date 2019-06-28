
import {requestApiV2} from '../../../utils/utils'

export default {
  namespace: 'mocks',
  state: {
    name:'mocks'
  },
  reducers:{},
  effects:{
    *test({ payload,callback }, { call, put }) {
        // const data = yield call(mockService.test, payload);
        const data = yield call(requestApiV2, payload);
        console.log(data)
        if (callback) callback(data);
    },
  }
}