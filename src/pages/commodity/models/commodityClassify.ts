import { Effect } from 'dva';
import { Reducer } from 'redux';

// 以下是mock数据
import classifyInfo, { commodityMessage } from '../../../../mock/commdityClassify';
import { filterStatusDiabTree, filterClassify } from '@/utils/filterProperty';
import {
  categoryType,
  categoryProduct,
  deleteCategory,
  reorderCategory,
  categoryInsert,
  productInsert,
} from '@/services/comdClassify';

function findChildren(data, id) {
  const item = data.find(item => item.id === id);
  return item.children;
}
const CommodityModel = {
  namespace: 'commodityClassify',
  state: {
    // 分类下的商品
    commodityInfo: commodityMessage.data,
    // 分类下商品的查询关键字
    searchKeyword: '',
    // 是否切换分类类,true代表刷新完,false代表刚分类切换过
    isSwitchover: true,
    selectedRowKeys: [],
    // 弹窗的可添加商品list
    modalProductList: {
      pageList: [],
      total: 0,
    },
  },
  effects: {
    // 获取分类类型,对分类类型进行切分,化为分别的三级分类样式
    *classification({ payload, callback }, { call, put }) {
      const response = yield call(categoryType, {
        status: 0,
      });
      yield put({
        type: 'sortCas',
        payload: response,
      });
    },
    // 选中分类，改变分类选中项，同时发送请求查找最新商品
    *selectCas({ payload, callback }, { select, call, put }) {
      console.log('inSelectcas_', payload);
      yield put({
        type: 'selectCasIn',
        payload,
      });
      const state = yield select(state => state);
      const id = state.commodityClassify.casThreeId;
      let response;
      if (id) {
        response = yield call(categoryProduct, {
          categoryId: id,
          pageNumber: 0,
          pageSize: 10000,
          status: 0,
        });
      } else {
        response = {
          data: {
            pageList: [],
          },
        };
      }
      // 清空数据
      yield put({
        type: 'modifyCommodity',
        payload: [],
      });
      // 放入刷新获取的数据
      yield put({
        type: 'resetCommodity',
        payload: response.data,
      });
    },
    // 移除选中药品
    *removeCommodity(_, { select, call, put }) {
      // 清空选中数据
      const state = yield select(state => state);
      console.log('state_', state);
      const { casThreeId, selectedRowKeys, casInfoThree } = state.commodityClassify;
      const response = yield call(deleteCategory, {
        categoryId: casThreeId,
        productIds: selectedRowKeys,
      });
      // 从当前列表中过滤出移除后的选项
      yield put({
        type: 'filterRmAfter',
      });
      // 清空已经选择的商品
      yield put({
        type: 'modifyCommodity',
        payload: [],
      });
    },
    // 调换各级分类的位置
    *reverseCasInfo({ payload }, { select, call, put }) {
      const state = yield select(state => state.commodityClassify);
      console.log('state_', state);
      const { dragIndex, hoverIndex } = payload;
      let reverseArr;
      switch (payload.classify) {
        case 1:
          reverseArr = state.casInfoOne;
          break;
        case 2:
          reverseArr = state.casInfoTwo;
          break;
        case 3:
          reverseArr = state.casInfoThree;
          break;
        default:
          break;
      }
      const idArr = [reverseArr[dragIndex].id, reverseArr[hoverIndex].id];
      yield call(reorderCategory, { categoryIds: idArr });
      // 改变顺序
      yield put({
        type: 'reverseCas',
        payload: {
          ...payload,
          reverseArr,
        },
      });
    },
    // 依据关键字进行查询
    *selectCasInKeyword(_, { select, call, put }) {
      const state = yield select(state => state.commodityClassify);
      const id = state.casThreeId;
      let response;
      if (id) {
        response = yield call(categoryProduct, {
          categoryId: id,
          keyword: state.searchKeyword,
          pageNumber: 0,
          pageSize: 10000,
          status: 0,
        });
      } else {
        response = {
          data: {
            pageList: [],
          },
        };
      }
      // 清空数据
      yield put({
        type: 'modifyCommodity',
        payload: [],
      });
      // 放入刷新获取的数据
      yield put({
        type: 'resetCommodity',
        payload: response.data,
      });
    },
    // 添加分类接口
    *categoryInsert({ payload }, { select, call, put }) {
      const state = yield select(state => state.commodityClassify);
      console.log('payload_', payload);
      let parentId;
      switch (payload.classify) {
        case 1:
          parentId = 0;
          break;
        case 2:
          parentId = state.casOneId;
          break;
        case 3:
          parentId = state.casTwoId;
          break;
        default:
          break;
      }
      const response = yield call(categoryInsert, {
        cateName: payload.cateName,
        parentId,
      });
      // 往对应的分类级里面添加分类
      if (response && response.data) {
        yield put({
          type: 'categoryAdd',
          payload: {
            ...response,
            classify: payload.classify,
          },
        });
      }
    },
    // 往当前三级分类里面添加商品信息
    *productInsert(_, { select, call, put }) {
      const state = yield select(state => state.commodityClassify);
      const response = yield call(productInsert, {
        categoryId: state.casThreeId,
        productIds: state.selectedProductKeys,
      });
    },
    // 选好的商品添加到别的三级分类中
    *productInsertTo({ payload }, { select, call, put }) {
      const state = yield select(state => state.commodityClassify);
      const response = yield call(productInsert, {
        categoryId: payload,
        productIds: state.selectedRowKeys,
      });
    },
    // 弹窗查询可添加药品
    *productSearch({ payload }, { select, call, put }) {
      const state = yield select(state => state.commodityClassify);
      const response = yield call(categoryProduct, {
        categoryId: state.casThreeId,
        pageNumber: 0,
        keyword: payload,
        pageSize: 20,
        status: 1,
      });
      // 往弹窗里面添加数据
      yield put({
        type: 'resetProduct',
        payload: response.data,
      });
    },
    // 获取商品分类，并对父级分类数据进行禁用，只能获取三级分类
    *classifyDisabled(_, { select, call, put }) {
      const response = yield call(categoryType, {
        status: 0,
      });
      yield put({
        type: 'classifyDisabledMod',
        payload: response.data,
      });
    },
  },

  reducers: {
    // 对传过来的值递归进行一,二,三级的分类
    sortCas(state, action) {
      // const commdityClassify = filterClassify(state.classifyInfo.data);
      const info = action.payload;
      const obj = {
        casOneId: info.data[0].id,
        casTwoId: info.data[0].children[0].id,
        casThreeId: info.data[0].children[0].children[0].id,
        // 当前三级分类各级对应id
        casInfoOne: info.data,
        casInfoTwo: info.data[0].children,
        casInfoThree: info.data[0].children[0].children,
      };
      const commdityClassify = filterClassify(info.data);
      return {
        ...state,
        ...commdityClassify,
        ...obj,
      };
    },
    // 对分类位置进行变换
    reverseCas(state, action) {
      const info = action.payload;
      const { reverseArr } = info;
      let item;
      item = reverseArr[info.dragIndex];
      reverseArr[info.dragIndex] = reverseArr[info.hoverIndex];
      reverseArr[info.hoverIndex] = item;
      return {
        ...state,
      };
    },
    // 选中分类类别
    selectCasIn(state, action) {
      console.log('action.payload_', action.payload);
      const Obj = new Object();
      switch (action.payload.classify) {
        case 1:
          // 下面是对选中后1，2，3级类别进行修改
          Obj.casInfoTwo = findChildren(state.casInfoOne, action.payload.id);
          Obj.casInfoThree =
            Obj.casInfoTwo[0] && Obj.casInfoTwo[0].children ? Obj.casInfoTwo[0].children : [];
          // 下面是对当前选中id值进行修改
          Obj.casOneId = action.payload.id;
          Obj.casTwoId = Obj.casInfoTwo[0] && Obj.casInfoTwo[0].id ? Obj.casInfoTwo[0].id : '';
          Obj.casThreeId =
            Obj.casInfoTwo[0] && Obj.casInfoTwo[0].children[0] && Obj.casInfoTwo[0].children[0].id
              ? Obj.casInfoTwo[0].children[0].id
              : '';
          break;
        case 2:
          Obj.casInfoThree = findChildren(state.casInfoTwo, action.payload.id);
          Obj.casTwoId = action.payload.id;
          Obj.casThreeId = Obj.casInfoThree[0] ? Obj.casInfoThree[0].id : '';
          break;
        case 3:
          Obj.casThreeId = action.payload.id;
          break;
        default:
          break;
      }
      console.log('Obj_', Obj);
      return {
        ...state,
        ...Obj,
      };
    },
    // 拖起的时候获取拖起对应的分类目标
    dragStart(state, action) {
      // 必须是同步的
      console.log('onDrag_', action.payload);
      const dragStart = action.payload;
      return {
        ...state,
        dragStart,
      };
    },
    // 修改查询关键字
    modifyKeyWord(state, action) {
      const searchValue = action.payload;
      console.log('searchValue_', action.payload);
      return {
        ...state,
        searchKeyword: searchValue,
      };
    },
    // 修改药物列表
    resetCommodity(state, action) {
      console.log('action_resetCommodity_', action);
      return {
        ...state,
        commodityInfo: action.payload,
      };
    },
    // 修改刷新状态
    modifySwitchover(state, action) {
      return {
        ...state,
        isSwitchover: action.payload,
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
    // 从当前选中的列表中移除删除项
    filterRmAfter(state) {
      const newCommodityArr = state.commodityInfo.pageList.filter(item => {
        return state.selectedRowKeys.indexOf(item.productId) < 0;
      });
      state.commodityInfo.pageList = newCommodityArr;
      return {
        ...state,
        commodityInfo: state.commodityInfo,
      };
    },
    // 往对应的分类级里面添加分类
    categoryAdd(state, action) {
      console.log('action_', action.payload);
      const { data, classify } = action.payload;
      switch (classify) {
        case 1:
          state.casInfoOne.push({
            ...data,
            classify,
          });
          break;
        case 2:
          state.casInfoTwo.push({
            ...data,
            classify,
          });
          break;
        case 3:
          state.casInfoThree.push({
            ...data,
            classify,
          });
          break;
        default:
          break;
      }
      console.log('statecasInfoThree_', state.casInfoThree);
      return {
        ...state,
      };
    },
    // 修改清空弹框选中添加商品数据
    modifyProduct(state, action) {
      console.log('action_modifyProduct_', action.payload);
      return {
        ...state,
        selectedProductKeys: action.payload,
      };
    },
    // 重置弹窗可显示的可添加商品信息
    resetProduct(state, action) {
      return {
        ...state,
        modalProductList: action.payload,
      };
    },
    // 弹窗用的分类，对父级分类设置disable
    classifyDisabledMod(state, action) {
      const treeDis = filterStatusDiabTree(action.payload);
      console.log('treeDis_', treeDis);
      return {
        ...state,
        classifyDisabledInfo: treeDis,
      };
    },
  },
};

export default CommodityModel;
