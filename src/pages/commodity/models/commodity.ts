import {
  productList,
  product,
  editorProduct,
  newProduct,
  productype,
  shelve,
  productTemplateList,
} from '@/services/commodity';
import deepCopy from '@/utils/deepCopy';

const tabelConditionsInfo = {
  0: {
    currentPage: 1,
    saleOrder: 'ascend',
    stockOrder: undefined,
  },
  1: {
    currentPage: 1,
    saleOrder: undefined,
    stockOrder: undefined,
  },
  2: {
    currentPage: 1,
    saleOrder: undefined,
    stockOrder: undefined,
  },
};
const searchFormInfo = {
  startTime: undefined,
  endTime: undefined,
  recommandStatus: 3,
  productType: '',
  productCommonName: '',
  approvalNumber: '',
};
const tabStatus = 0;
const CommodityModel = {
  namespace: 'commodity',
  state: {
    productList: {},
    productWithId: {},
    productLog: {},
    allProductType: {},
    // 代表商品是0-出售中,1-已下架，2-已售罄
    productListStatus: tabStatus,
    // 商品三个状态分别的sort排序方式,0-出售中,1-已下架，2-已售罄
    tabelConditions: deepCopy(tabelConditionsInfo),
    // list searchForm
    searchForm: deepCopy(searchFormInfo),
  },
  effects: {
    // 获取商品列表
    *getList({ payload }, { call, put, select }) {
      const status = yield select(state => state.commodity.productListStatus);
      const params = Object.assign(payload, { status });
      console.log('in_getList_params', params);
      const response = yield call(productList, params);
      yield put({
        type: 'list',
        payload: response.data,
      });
      if (response.code === 1) {
        // 接口调用成功
        // do something...
        return response.data; //  通过return给dispatch返回回调结果！
      }
      // 接口调用失败
      // do something...
      return false;
    },
    // 依据id获取单个商品列表
    *getProduct({ payload }, { call, put }) {
      const response = yield call(product, payload);
      yield put({
        type: 'product',
        payload: response.data,
      });
    },
    // 新建产品
    *newProduct({ payload }, { call, put }) {
      const response = yield call(newProduct, payload);
      yield put({
        type: 'successProduct',
        payload: response.data,
      });
    },
    // 编辑产品
    *editProduct({ payload }, { call, put }) {
      console.log('in_editProduct');
      const response = yield call(editorProduct, payload);
      yield put({
        type: 'successProduct',
        payload: response.data,
      });
    },
    // 获取产品类型字典
    *getProductType(_, { call, put }) {
      const response = yield call(productype);
      yield put({
        type: 'allProductType',
        payload: response.data,
      });
    },
    // 上下架产品
    *shelveProduct({ payload }, { call }) {
      console.log('in_shelveProduct');
      const response = yield call(shelve, payload);
      if (response.code === 1) {
        // 接口调用成功
        // do something...
        return true; //  通过return给dispatch返回回调结果！
      }
      // 接口调用失败
      // do something...
      return false;
    },

    // H5后台管理系统二期，获取模版拉取的商品信息
    *productTemplateList({ payload }, { call }) {
      console.log('in_productTemplateList');
      const response = yield call(productTemplateList, payload);
      if (response.code === 1) {
        // 接口调用成功
        // do something...
        return response.data; //  通过return给dispatch返回回调结果！
      }
      // 接口调用失败
      // do something...
      return false;
    },
  },

  reducers: {
    // 获取商品列表
    list(state, action) {
      action.payload.pageList.forEach((element, index) => {
        element.key = index;
      });
      state.productList = action.payload;
      return {
        ...state,
        ...action.payload,
      };
    },
    // 获取单个商品
    product(state, action) {
      state.productWithId = action.payload.product;
      state.productLog = action.payload.log;
      console.log('in product');
      return {
        ...state,
        ...action.payload,
      };
    },
    // 重置所有图片信息
    resetProduct(state, action) {
      console.log('in_resetProduct');
      state.productWithId = action.payload;
      return {
        ...state,
        ...action.payload,
      };
    },
    // 编辑或者新建产品成功后
    successProduct(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },

    allProductType(state, action) {
      state.allProductType = action.payload;
      console.log('state.allProductType_', action.payload);
      return {
        ...state,
        ...action.payload,
      };
    },
    // 重置commidityList列表
    resetList(state, action) {
      state.productList.pageList = action.payload;
      return {
        ...state,
        ...action.payload,
      };
    },
    // 重置当前商品tab
    resetStatus(state, action) {
      console.log('in_resetStatus', action.payload);
      return {
        ...state,
        ...action.payload,
      };
    },
    // 设置商品列表table值
    setTabelConditions(state, action) {
      console.log('tabelConditions_', action.payload);
      return {
        ...state,
        tabelConditions: action.payload,
      };
    },
    // 重置按钮重置所有，除了当前tab
    resetForm(state, action) {
      console.log('tabelConditionsInfo_', tabelConditionsInfo);
      return {
        ...state,
        tabelConditions: deepCopy(tabelConditionsInfo),
        searchForm: deepCopy(searchFormInfo),
      };
    },

    // 二期，保存商品searchForm信息
    saveSearchForm(state, action) {
      return {
        ...state,
        searchForm: action.payload,
      };
    },
  },
};

export default CommodityModel;
