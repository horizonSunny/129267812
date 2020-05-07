import {
  getBannerList,
  reverseBannerList,
  deleteBannerItem,
  newBannerItem,
  editorBannerItem,
  changeBannerItem,
} from '@/services/operTool';
import { categoryType } from '@/services/comdClassify';
import { filterStatusTree, changeDisaStatus } from '@/utils/filterProperty';
import deepCopy from '@/utils/deepCopy';

const CommodityModel = {
  namespace: 'banner',
  state: {
    categoryList: [],
    pageNumber: 0,
    pageSize: 5,
    totalElements: 0,
  },
  effects: {
    // 获取分类类型,对分类类型进行切分,化为分别的三级分类样式
    *getBannerList({ payload }, { call, put }) {
      const response = yield call(getBannerList, payload);
      console.log('in_getBannerList_', response);
      yield put({
        type: 'setCategoryList',
        payload: response.data.pageList,
      });
      yield put({
        type: 'setCategoryListInfo',
        payload: {
          pageNumber: response.data.pageNumber,
          pageSize: response.data.pageSize,
          totalElements: response.data.totalElements,
        },
      });
    },
    // 改变list顺序
    *reverseBannerList({ payload }, { call, put }) {
      const response = yield call(reverseBannerList, payload);
      console.log('in_reverseBannerList_', response);
      yield put({
        type: 'reverseCategory',
        payload: payload.bannerIds,
      });
    },
    // 删除listItem
    *deleteBannerItem({ payload }, { call, put }) {
      const response = yield call(deleteBannerItem, payload);
      console.log('in_reverseBannerList_', response);
      yield put({
        type: 'deleteBanner',
        payload: payload.bannerId,
      });
    },
    // 开启或者关闭快速找药
    *resetBannerItem({ payload }, { call, put, select }) {
      const response = yield call(changeBannerItem, payload);
      if (response && response.code === 1) {
        const { categoryList } = yield select(state => state.banner);
        categoryList.map(item => {
          if (item.bannerId === payload.bannerId) {
            item.status = payload.status;
          }
        });
        yield put({
          type: 'setCategoryList',
          payload: categoryList,
        });
      }
    },
    // 新增快速找药
    *newBannerItem({ payload }, { call, put }) {
      // const response = yield call(newBannerItem, payload);
      let response;
      console.log('in_newBannerItem_', payload);
      if (payload.bannerId) {
        // 编辑
        response = yield call(editorBannerItem, payload);
        if (!response) {
          throw new Error('未成功');
        }
      } else {
        response = yield call(newBannerItem, payload);
        if (!response) {
          throw new Error('未成功');
        }
      }
    },
    // 为生成treeSelect选择器data
    *categoryTree(_, { call, put }) {
      const response = yield call(categoryType, {
        status: 0,
      });
      console.log('response_categoryTree_', response);
      yield put({
        type: 'saveCategoryTree',
        payload: response,
      });
    },
  },

  reducers: {
    // 设置categoryList
    setCategoryList(state, action) {
      console.log('action.categoryList_', action);
      return {
        ...state,
        categoryList: action.payload,
      };
    },
    setCategoryListInfo(state, action) {
      console.log('action.setCategoryListInfo_', action);
      return {
        ...state,
        ...action.payload,
      };
    },
    // 排序categoryList
    reverseCategory(state, action) {
      const startIndex = state.categoryList.findIndex(item => {
        return item.bannerId === action.payload[0];
      });
      const endIndex = state.categoryList.findIndex(item => {
        return item.bannerId === action.payload[1];
      });
      const item = state.categoryList[startIndex];
      console.log('state.categoryList[startIndex]_', state.categoryList[startIndex]);
      console.log('state.categoryList[endIndex]_', state.categoryList[endIndex]);
      state.categoryList[startIndex] = state.categoryList[endIndex];
      state.categoryList[endIndex] = item;
      return {
        ...state,
      };
    },
    // 删除id
    deleteBanner(state, action) {
      const newArr = state.categoryList.filter(item => {
        return item.bannerId !== action.payload;
      });
      return {
        ...state,
        categoryList: newArr,
      };
    },
    // 保存编辑数据
    saveBanner(state, action) {
      return {
        ...state,
        categoryItem: action.payload,
      };
    },
    // 保存分类数据
    saveCategoryTree(state, action) {
      const result = filterStatusTree(action.payload.data);
      console.log('result_', result);
      return {
        ...state,
        categoryTree: result,
      };
    },
    // 2.0 改变产品分类数据中disabled的状态
    changTreeDis(state, action) {
      const result = changeDisaStatus(action.payload, state.categoryTree);
      console.log('changTreeDis_', deepCopy(result));
      return {
        ...state,
        categoryTree: deepCopy(result),
      };
    },
  },
};

export default CommodityModel;
