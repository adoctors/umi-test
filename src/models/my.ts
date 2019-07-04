import { Effect } from 'dva';
import { Reducer } from 'redux';
import {query} from '../services/my';



// 声明model下state某个属性的interface
export interface SelfMsg {
  name: string;
  age: number;
  school?: string;
  class?: string;
  score?: {
    English: number;
    Math: number;
  }
}

// 声明model下state的所有属性
export interface MyModelState {
  selfMsg?: SelfMsg;
}


// 声明整个model相关的
export interface MyModelType {
  namespace: 'my';
  state: MyModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    saveSeflMsg: Reducer<MyModelState>;
  };
}

// 整个model的实际数据及初始值
const MyModel: MyModelType = {
  namespace: 'my',

  state: {
    selfMsg: {
      name: 'adoctors',
      age: 18,
    },
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const data = yield call(query, payload);
      console.log(data)
      yield put({ type: 'saveSeflMsg', payload: data });
      if (callback) callback(data);
    },
  },

  reducers: {
    saveSeflMsg(state, { payload }){
      console.log(payload)
      return {...state};
    }
  },
};

export default MyModel;