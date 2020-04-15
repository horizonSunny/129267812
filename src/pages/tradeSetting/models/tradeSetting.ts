// import { Effect } from 'dva';
// import { Reducer } from 'redux';
import { getPickUp } from '@/services/tradeSetting';
// 运费模版初始化
const freightTemplateInfo = {
  // 区域运费
  areaFreights: [
    {
      areas: ['13', '1101', '1201', '1401', '1501'],
      firstNum: 10,
      firstPrice: 10,
      continuePrice: 10,
    },
  ],
  // 默认运费
  continuePrice: 10,
  firstNum: 5,
  firstPrice: 7,
  templateName: 'test',
  templateType: 1,
};
// 区域运费初始化
const areaFreight = {
  areas: [],
  continuePrice: '',
  firstNum: '',
  firstPrice: '',
};
const tradeSetting = {
  namespace: 'tradeSetting',

  state: {
    hasSelfDelivery: false,
    selfDeliveryInfo: {},
    // 运费模版配置信息
    freightTemplateInfo,
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
    // 新增运费模版初始化
  },
};

export default tradeSetting;
