// import { Effect } from 'dva';
// import { Reducer } from 'redux';
import { getPickUp } from '@/services/tradeSetting';
import deepCopy from '@/utils/deepCopy';

// 运费模版初始化
const freightTemplateInfo = {
  // 区域运费
  areaFreights: [
    {
      areas: [],
      firstNum: '',
      firstPrice: '',
      continuePrice: '',
    },
  ],
  // 默认运费
  continuePrice: '',
  firstNum: '',
  firstPrice: '',
  templateName: '',
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
    // 新增运费模版区域更改
    setFreightTemplateArea(state, action) {
      const freightTemplateInfo = deepCopy(state.freightTemplateInfo);
      const { index } = action.payload;
      freightTemplateInfo.areaFreights[index].areas = action.payload.areaIds;
      // state.
      return {
        ...state,
        freightTemplateInfo,
      };
    },
    // 增加新模版区域
    addTemplateArea(state, action) {
      const freightTemplateInfo = deepCopy(state.freightTemplateInfo);
      freightTemplateInfo.areaFreights.push(areaFreight);
      return {
        ...state,
        freightTemplateInfo,
      };
    },
    // 删除新模版区域
    deleteTemplateArea(state, action) {
      const freightTemplateInfo = deepCopy(state.freightTemplateInfo);
      const index = action.payload;
      freightTemplateInfo.areaFreights.splice(index, 1);
      return {
        ...state,
        freightTemplateInfo,
      };
    },
    // 添加新模版
    newTemplate(state, action) {
      return {
        ...state,
        freightTemplateInfo,
      };
    },
  },
};

export default tradeSetting;
