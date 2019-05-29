
import {requestApi} from '../../../utils/utils';

export default {
  namespace: 'list',

  state: {
    customerList: {},
  },

  effects: {
    *customerList({ payload, successCallback }, { call, put }) {
      const { data } = yield call(requestApi, payload);
      if (successCallback) successCallback(data);
    },

  },

  reducers: {

  },
};
