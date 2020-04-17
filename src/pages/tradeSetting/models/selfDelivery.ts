import { getPickUp, pickUpStatus } from '@/services/tradeSetting';

const selfDelivery = {
  namespace: 'selfDelivery',

  state: {
    // 运费模版配置信息
    pickUp: null,
  },

  effects: {
    *getPickUp({ payload }, { call, put }) {
      const response = yield call(getPickUp);
      if (response && response.code === 1) {
        yield put({
          type: 'setPickUp',
          payload: response.data,
        });
      }
    },
    *changePickUpStatus({ payload }, { call, put }) {
      const response = yield call(pickUpStatus, payload);
    },
    // *setNonDelivery({ payload }, { call, put }) {
    //   const response = yield call(setNonDelivery, payload);
    //   if (response && response.code === 1) {
    //     yield put({
    //       type: 'setnonDelivery',
    //       payload: response.data,
    //     });
    //   }
    // },
  },

  reducers: {
    // 保存搜索条件
    setPickUp(state, action) {
      console.log('action.payload_', action.payload);
      return {
        ...state,
        pickUp: action.payload,
      };
    },
  },
};

export default selfDelivery;
