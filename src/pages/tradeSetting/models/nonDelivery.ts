import { getNonDelivery, setNonDelivery } from '@/services/tradeSetting';

const nonDelivery = {
  namespace: 'nonDelivery',

  state: {
    // 运费模版配置信息
    nonDeliveryInfo: {
      deliveryArea: [],
    },
  },

  effects: {
    *getNonDelivery({ payload }, { call, put }) {
      const response = yield call(getNonDelivery);
      if (response && response.code === 1) {
        yield put({
          type: 'setnonDelivery',
          payload: response.data,
        });
      }
    },
    *setNonDelivery({ payload }, { call, put }) {
      const response = yield call(setNonDelivery, payload);
      if (response && response.code === 1) {
        yield put({
          type: 'setnonDelivery',
          payload: response.data,
        });
      }
    },
    // *newFreight({ payload }, { call, put }) {
    //   yield call(newFreight, payload);
    // },
    // *updateFreight({ payload }, { call, put }) {
    //   yield call(updateFreight, payload);
    // },
  },

  reducers: {
    // 保存搜索条件
    setnonDelivery(state, action) {
      console.log('action.payload_', action.payload);
      return {
        ...state,
        nonDeliveryInfo: action.payload,
      };
    },
  },
};

export default nonDelivery;
