import { getNonDelivery } from '@/services/tradeSetting';
import deepCopy from '@/utils/deepCopy';

const tradeSetting = {
  namespace: 'nonDelivery',

  state: {
    // 运费模版配置信息
    nonDeliveryInfo: {},
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

export default tradeSetting;
