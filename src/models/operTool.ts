import { Effect } from 'dva';
import { Reducer } from 'redux';
import {
  getCategoryList,
  reverseCategoryList,
  deleteCategoryItem,
  newCategoryItem,
  editorCategoryItem,
} from '@/services/operTool';
import { categoryType } from '@/services/comdClassify';
import { filterStatusTree, changeDisaStatus } from '@/utils/filterProperty';
import deepCopy from '@/utils/deepCopy';

const CommodityModel = {
  namespace: 'operTool',
  state: {
    categoryList: [],
  },
  effects: {
    // 获取分类类型,对分类类型进行切分,化为分别的三级分类样式
    *getCategoryList({ payload }, { call, put }) {
      const response = yield call(getCategoryList, payload);
      console.log('in_getCategoryList_', response);
      yield put({
        type: 'setCategoryList',
        payload: response.data.pageList,
      });
    },
    // 改变list顺序
    *reverseCategoryList({ payload }, { call, put }) {
      const response = yield call(reverseCategoryList, payload);
      console.log('in_reverseCategoryList_', response);
      yield put({
        type: 'reverseCategory',
        payload: payload.quickCategoryIds,
      });
    },
    // 删除listItem
    *deleteCategoryItem({ payload }, { call, put }) {
      const response = yield call(deleteCategoryItem, payload);
      console.log('in_reverseCategoryList_', response);
      yield put({
        type: 'deleteCategory',
        payload: payload.quickCategoryId,
      });
    },
    // 新增快速照耀
    *newCategoryItem({ payload }, { call, put }) {
      // const response = yield call(newCategoryItem, payload);
      let response;
      console.log('in_newCategoryItem_', payload);
      if (payload.quickCategoryId) {
        // 编辑
        response = yield call(editorCategoryItem, payload);
      } else {
        response = yield call(newCategoryItem, payload);
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
    // 排序categoryList
    reverseCategory(state, action) {
      const startIndex = state.categoryList.findIndex(item => {
        return item.quickCategoryId === action.payload[0];
      });
      const endIndex = state.categoryList.findIndex(item => {
        return item.quickCategoryId === action.payload[1];
      });
      const item = state.categoryList[startIndex];
      state.categoryList[startIndex] = state.categoryList[endIndex];
      state.categoryList[endIndex] = item;
      return {
        ...state,
      };
    },
    // 删除id
    deleteCategory(state, action) {
      const newArr = state.categoryList.filter(item => {
        return item.quickCategoryId !== action.payload;
      });
      return {
        ...state,
        categoryList: newArr,
      };
    },
    // 保存编辑数据
    saveCategory(state, action) {
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
