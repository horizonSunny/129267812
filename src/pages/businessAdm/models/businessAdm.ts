import { Effect } from 'dva';
import { Reducer } from 'redux';
import { notification } from 'antd';
import {
  queryOrederList,
  cancelOrder,
  getOrder,
  refundOrder,
  pickupCode,
  shipper,
  deliverGoods,
  getTraces,
} from '@/services/businessAdm';

const businessAdm = {
  namespace: 'businessAdm',

  state: {
    // 快递公司编号
    shipperInfo: [],
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
    selectedRowKeys: [],
    // 物流信息
  },

  effects: {
    // 获取快递公司的编号
    *getShipperInfo({ payload }, { call, put }) {
      const response = yield call(shipper);
      if (response && response.code === 1) {
        yield put({
          type: 'setShipperInfo',
          payload: response.data,
        });
      }
    },
    *queryList({ payload }, { call, put }) {
      // if (payload.province && payload.province.length > 0) {
      //   payload.province = payload.province.join(',');
      // }
      const response = yield call(queryOrederList, payload);
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
    // 取消订单
    *cancelOrder({ payload }, { call, put, select }) {
      const response = yield call(cancelOrder, payload);
      const { currentRecord } = yield select(state => state.businessAdm);
      console.log('cancelOrder_over');
      console.log('state_', currentRecord);
      if (response) {
        yield put({
          type: 'getOrder',
          payload: {
            orderNo: currentRecord.orderNo,
          },
        });
      } else {
        return Promise.reject();
      }
      console.log('getOrder_over');
    },
    // 根据订单号查询订单
    *getOrder({ payload }, { call, put }) {
      console.log('payload_', payload);
      const response = yield call(getOrder, payload);
      if (response && response.code === 1) {
        yield put({
          type: 'record',
          payload: response.data,
        });
      }
    },
    // 退款
    *refundOrder({ payload }, { call, put, select }) {
      const response = yield call(refundOrder, payload);
      const { currentRecord } = yield select(state => state.businessAdm);
      if (response) {
        yield put({
          type: 'getOrder',
          payload: {
            orderNo: currentRecord.orderNo,
          },
        });
      } else {
        return Promise.reject();
      }
      console.log('refundOrder');
    },
    // 取货码核销
    *pickupCode({ payload }, { call, put, select }) {
      const response = yield call(pickupCode, payload);
      const { currentRecord } = yield select(state => state.businessAdm);
      if (response && response.data.checkResult) {
        yield put({
          type: 'getOrder',
          payload: {
            orderNo: currentRecord.orderNo,
          },
        });
      } else if (response && !response.data.checkResult) {
        // return Promise.reject();
        notification.error({
          message: '取货码核验失败',
        });
        return Promise.reject();
      } else {
        return Promise.reject();
      }
      console.log('refundOrder');
    },
    // 发货
    *deliverGoods({ payload }, { call, put, select }) {
      const response = yield call(deliverGoods, payload);
      const { currentRecord } = yield select(state => state.businessAdm);
      if (response) {
        yield put({
          type: 'getOrder',
          payload: {
            orderNo: currentRecord.orderNo,
          },
        });
      } else {
        return Promise.reject();
      }
    },
    // 获取物流信息
    *getTraces({ payload }, { call, put, select }) {
      const response = yield call(getTraces, payload);
      if (response) {
        yield put({
          type: 'setTraces',
          payload: response.data,
        });
        return response;
      }
      return Promise.reject('null');
    },
  },

  reducers: {
    setShipperInfo(state, action) {
      return {
        ...state,
        shipperInfo: action.payload,
      };
    },
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
    // 重置物流信息
    setTraces(state, action) {
      return {
        ...state,
        tracesInfo: action.payload,
      };
    },
  },
};

export default businessAdm;
