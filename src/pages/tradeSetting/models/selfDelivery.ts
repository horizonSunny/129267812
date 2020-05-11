import { getPickUp, pickUpStatus, openPickUp, merchantTitle } from '@/services/tradeSetting';
import { filterAreaNameInfo } from '@/utils/filterProperty';
// 没开通自提
import noSelfDelivery from '@/assets/tradeSetting/noSelfDelivery.svg';

const pickUpForm = {
  tenantName: '',
  province: '',
  city: '',
  area: '',
  address: '',
  adminTel: '',
  // 营业日期
  businessDate: [],
  businessDateTime:[],
  startTime: '00:00:00',
  endTime: '23:59:59',
  // 是否开通
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
        console.log(pickUp.isPick,'是否开通');
        
        yield put({
          type: 'savePickUp',
          payload: pickUp,
        });
      }
    },
    *openPickUp({ payload }, { call, put }) {
      const response = yield call(openPickUp, payload);
    
      if(response && response.code === 1){
        return response
      }
      return Promise.reject()
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
    // 获取商户信息
    // *merchantInformation({payload},{call, put}){
    //   const response = yield call(merchantTitle, payload);
    // }
  },

  reducers: {
    // 保存搜索条件
    setPickUp(state, action) {
      let startTime
      let endTime
      // let businessDate
      let isPick
      let businessDateTime
      console.log('action.payload_', action.payload);
      // 营业时间
      if(action.payload.businessHours === null){
         [startTime, endTime] =[0,0]
      }else{
        [startTime, endTime] = action.payload.businessHours.split('-');
      };
      console.log(startTime, endTime,'startTime, endTime');
      // const [startTime, endTime] = action.payload.businessHours.split('-');
      // 营业日期
      if(action.payload.businessDate === null){
        businessDateTime = ['暂无信息']
      }else{
        businessDateTime = action.payload.businessDate;
      }
      console.log(businessDateTime,'营业日期');
        
      // 开通自提
      if(action.payload.isPick===null&&2){
        return;
      }else if(action.payload.isPick===1){
        isPick = action.payload.isPick;
      }
      console.log(isPick,'是否开通');
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
          businessDateTime,
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
