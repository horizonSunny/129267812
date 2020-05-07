import { getPickUp, pickUpStatus, openPickUp } from '@/services/tradeSetting';
import { filterAreaNameInfo } from '@/utils/filterProperty';

const pickUpForm = {
  tenantName: '',
  province: '',
  city: '',
  area: '',
  address: '',
  adminTel: '',
  businessDate: [],
  startTime: '00:00:00',
  endTime: '23:59:59',
  isPick: 2,
};
const selfDelivery = {
  namespace: 'selfDelivery',

  state: {
    // 运费模版配置信息
    pickUp: null,
    pickUpForm,
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
      return response.data;
    },
    *changePickUpStatus({ payload }, { call, put, select }) {
      const response = yield call(pickUpStatus, payload);
      if (response && response.code === 1) {
        const { pickUp } = yield select(state => state.selfDelivery);
        pickUp.isPick = payload.status;
        yield put({
          type: 'savePickUp',
          payload: pickUp,
        });
      }
    },
    *openPickUp({ payload }, { call, put }) {
      const response = yield call(openPickUp, payload);
      // if (response && response.code === 1) {
      //   yield put({
      //     type: 'setPickUp',
      //     payload: response.data,
      //   });
      // }
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
      const [startTime, endTime] = action.payload.businessHours.split('-');
      const params = [action.payload.province, action.payload.city, action.payload.area];
      const [province, city, area] = filterAreaNameInfo(params, 'findCode');
      let form = pickUpForm;
      if (action.payload) {
        form = {
          ...action.payload,
          startTime,
          endTime,
          province,
          city,
          area,
        };
      }
      return {
        ...state,
        pickUp: action.payload,
        pickUpForm: form,
        // 如果有就是action.payload，没有就设置定义的pickUpForm
        // pickUpForm: action.payload ? action.payload : pickUpForm,
      };
    },
    savePickUp(state, action) {
      return {
        ...state,
        pickUp: action.payload,
      };
    },
  },
};

export default selfDelivery;
