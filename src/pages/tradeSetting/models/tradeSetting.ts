// import { Effect } from 'dva';
// import { Reducer } from 'redux';
import { getPickUp, newFreight, freightList } from '@/services/tradeSetting';
import deepCopy from '@/utils/deepCopy';

// 运费模版初始化
const freightTemplateInfo = {
  // 区域运费
  areaFreights: [
    {
      areas: [],
      firstNum: null,
      firstPrice: null,
      continuePrice: null,
    },
  ],
  // 默认运费
  continuePrice: null,
  firstNum: null,
  firstPrice: null,
  templateName: '',
  templateType: 1,
};
// 区域运费初始化
const areaFreight = {
  areas: [],
  continuePrice: null,
  firstNum: null,
  firstPrice: null,
};
const tradeSetting = {
  namespace: 'tradeSetting',

  state: {
    // 运费模版配置信息
    freightTemplateInfo,
  },

  effects: {
    *selfDelivnewFreighteryInfo({ payload }, { call, put }) {
      const response = yield call(getPickUp, payload);
      if (response && response.code === 1) {
        yield put({
          type: 'setSelfDelivery',
          payload: response.data,
        });
      }
    },
    *newFreight({ payload }, { call, put }) {
      yield call(newFreight, payload);
    },
    // 获取运费模版list
    *getFreightList({ payload }, { call, put }) {
      const response = yield call(freightList, payload);
      console.log('response_', response);
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
    // 改变模版默认运费
    changeTemplateDefault(state, action) {
      const freightTemplateInfo = deepCopy(state.freightTemplateInfo);
      const { key, value } = action.payload;
      console.log();

      freightTemplateInfo[key] = value;
      return {
        ...state,
        freightTemplateInfo,
      };
    },
    // 改变新模版区域价格，件数
    changeTemplateArea(state, action) {
      const freightTemplateInfo = deepCopy(state.freightTemplateInfo);
      const { key, value, index } = action.payload;
      freightTemplateInfo.areaFreights[index][key] = value;
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
    // 修改新模版名称和类型
    changeTemplateName(state, action) {
      const freightTemplateInfo = deepCopy(state.freightTemplateInfo);
      const { templateName, templateType } = action.payload;
      freightTemplateInfo.templateName = templateName;
      freightTemplateInfo.templateType = templateType;
      return {
        ...state,
        freightTemplateInfo,
      };
    },
  },
};

export default tradeSetting;
