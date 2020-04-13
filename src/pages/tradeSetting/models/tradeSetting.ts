// import { Effect } from 'dva';
// import { Reducer } from 'redux';
import { getPickUp } from '@/services/tradeSetting';

const tradeSetting = {
  namespace: 'tradeSetting',

  state: {
    hasSelfDelivery: false,
    selfDeliveryInfo: {},
  },

  effects: {
    *selfDeliveryInfo({ payload }, { call, put }) {
      const response = yield call(getPickUp, payload);
      if (response && response.code === 1) {
        yield put({
          type: 'setSelfDelivery',
          payload: response.data,
        });
      }
    },
  },

  reducers: {
    // 设置订单list集合
    setSelfDelivery(state, action) {
      let selfDeliveryInfo;
      let hasSelfDelivery;
      if (action.payload !== null) {
        selfDeliveryInfo = action.payload;
        hasSelfDelivery = true;
      }
      return {
        ...state,
        selfDeliveryInfo,
        hasSelfDelivery,
      };
    },
  },
};

export default tradeSetting;
