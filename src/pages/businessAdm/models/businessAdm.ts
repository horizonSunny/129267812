import { Effect } from 'dva';
import { Reducer } from 'redux';
import {
  queryBusiness,
  insertBusiness,
  saveBusiness,
  switchStatus,
  queryChannel,
  queryOperation,
} from '@/services/businessAdm';

const businessAdm = {
  namespace: 'businessAdm',

  state: {
    businessData: [],
    queryForm: {
      productCommonName: '',
      endTime: '',
      startTime: '',
      logisticCode: '',
      orderSource: 0,
      orderNo: '',
      orderStatus: 1,
      shipperTypeId: 0,
    },
    pagenation: {
      pageNumber: 0,
      pageSize: 10,
      // total: 0,
      // showSizeChanger: true,
      // showQuickJumper: true,
      // showTotal: total => {
      //   return `共 ${total} 条`;
      // },
    },
    currentRecord: {},
    channel: [],
    operaRecord: [],
    recordPagenation: {
      pageNumber: 0,
      pageSize: 10,
      totalElements: 0,
    },
    selectedRowKeys: [],
  },

  effects: {
    *queryList({ payload }, { call, put }) {
      // if (payload.province && payload.province.length > 0) {
      //   payload.province = payload.province.join(',');
      // }
      const response = yield call(queryBusiness, payload);
      if (response && response.code === 1) {
        yield put({
          type: 'queryData',
          payload: response.data,
        });
      }
      return response;
    },
    *queryFormChange({ payload }, { call, put }) {
      yield put({
        type: 'formChange',
        payload,
      });
      return payload;
    },
    *queryPagenationChange({ payload }, { call, put }) {
      yield put({
        type: 'pageNationChange',
        payload,
      });
      return payload;
    },
    *currentRecord({ payload }, { call, put }) {
      yield put({
        type: 'record',
        payload,
      });
      return payload;
    },
    *saveBusiness({ payload }, { call, put, select }) {
      const data = yield select(state => state.businessAdm.currentRecord);
      let response = {};
      const tempenterpriseQualification = [];
      if (payload.enterpriseQualification.length > 0) {
        payload.enterpriseQualification.forEach(item => {
          if (!item.url) {
            item.url = item.response.data;
          }
          tempenterpriseQualification.push({
            name: item.name,
            url: item.url,
          });
        });
        payload.enterpriseQualification = tempenterpriseQualification;
      }
      const tempstoreLive = [];
      if (payload.storeLive.length > 0) {
        payload.storeLive.forEach(item => {
          if (!item.url) {
            item.url = item.response.data;
          }
          tempstoreLive.push(item.url);
        });
        payload.storeLive = tempstoreLive;
      }
      const tempParam = Object.assign({}, data, payload);
      if (data && data.tenantId) {
        // 更新
        response = yield call(saveBusiness, tempParam);
      } else {
        // 新增
        response = yield call(insertBusiness, tempParam);
      }

      if (response && response.code === 1) {
        yield put({
          type: 'saveData',
          payload: response.data,
        });
      }
      return response;
    },
    *switchStatus({ payload }, { call, put }) {
      const response = yield call(switchStatus, payload);
      if (response && response.code === 1) {
        yield put({
          type: 'switchSave',
          payload,
        });
      }
      return response;
    },
    *initChannel(_, { call, put }) {
      const response = yield call(queryChannel);
      if (response && response.code === 1) {
        yield put({
          type: 'saveChannel',
          payload: response.data,
        });
      }
      return response;
    },
    *getOperationRecord({ payload }, { call, put }) {
      yield put({
        type: 'operaRecord',
        payload: [],
      });
      const response = yield call(queryOperation, payload);
      if (response && response.code === 1) {
        yield put({
          type: 'operaRecord',
          payload: response.data.pageList,
        });
        yield put({
          type: 'recordPagenation',
          payload: {
            pageNumber: response.data.pageNumber,
            pageSize: response.data.pageSize,
            totalElements: response.data.totalElements,
          },
        });
      }
    },
  },

  reducers: {
    // 设置订单list集合
    queryData(state, action) {
      const pagenation = {
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
        total: action.payload.totalElements,
      };
      return {
        ...state,
        businessData: action.payload.pageList || [],
        pageNation: pagenation,
      };
    },
    formChange(state, action) {
      return {
        ...state,
        queryForm: action.payload,
      };
    },
    pageNationChange(state, action) {
      const tempPagenation = {
        ...state.pagenation,
        ...action.payload,
      };
      return {
        ...state,
        pagenation: tempPagenation,
      };
    },
    record(state, action) {
      return {
        ...state,
        currentRecord: action.payload,
      };
    },
    saveData(state, action) {
      return {
        ...state,
        currentRecord: action.payload,
      };
    },
    switchSave(state, action) {
      const tempbusinessData = state.businessData;
      const result = action.payload;
      tempbusinessData.map(item => {
        if (item.tenantId === result.tenantId) {
          item.status = result.status;
        }
        return item;
      });
      return {
        ...state,
        businessData: tempbusinessData,
      };
    },
    saveChannel(state, action) {
      return {
        ...state,
        channel: action.payload,
      };
    },
    operaRecord(state, action) {
      return {
        ...state,
        operaRecord: action.payload,
      };
    },
    recordPagenation(state, action) {
      return {
        ...state,
        recordPagenation: action.payload,
      };
    },
    // 修改清空选中商品数据
    modifyCommodity(state, action) {
      console.log('action_modifyCommodity_', action.payload);
      return {
        ...state,
        selectedRowKeys: action.payload,
      };
    },
  },
};

export default businessAdm;
