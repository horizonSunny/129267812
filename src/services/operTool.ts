import request from '@/utils/request';

// 获取快速去要列表list集合
export async function getCategoryList(params: Object) {
  return request('/admin/v1/quickCategory/list', {
    params,
  });
}
// 快速分类顺序调整
export async function reverseCategoryList(params: Object) {
  return request('/admin/v1/quickCategory/update/order', {
    method: 'put',
    data: params,
  });
}
// 删除快速分类
export async function deleteCategoryItem(params: Object) {
  return request(`/admin/v1/quickCategory/delete/${params.quickCategoryId}`, {
    method: 'delete',
  });
}
// 新增快速分类接口
export async function newCategoryItem(params: Object) {
  return request('/admin/v1/quickCategory/insert', {
    method: 'post',
    data: params,
  });
}
// 编辑快速分类接口
export async function editorCategoryItem(params: Object) {
  return request('/admin/v1/quickCategory/update', {
    method: 'put',
    data: params,
  });
}

// 改变快速分类状态
export async function changeCategoryItem(params: Object) {
  return request('/admin/v1/quickCategory/update/status', {
    method: 'put',
    data: params,
  });
}
// 下面是banner数据
//
// 获取banner列表list集合
export async function getBannerList(params: Object) {
  return request('/admin/v1/banner/list', {
    params,
  });
}
// banner顺序调整
export async function reverseBannerList(params: Object) {
  return request('/admin/v1/banner/update/order', {
    method: 'put',
    data: params,
  });
}
// 删除banner
export async function deleteBannerItem(params: Object) {
  return request(`/admin/v1/banner/${params.bannerId}`, {
    method: 'delete',
  });
}
// 新增banner接口
export async function newBannerItem(params: Object) {
  return request('/admin/v1/banner/insert', {
    method: 'post',
    data: params,
  });
}
// 编辑banner接口
export async function editorBannerItem(params: Object) {
  return request('/admin/v1/banner/update', {
    method: 'put',
    data: params,
  });
}

// 改变快速分类状态
export async function changeBannerItem(params: Object) {
  return request('/admin/v1/banner/update/status', {
    method: 'put',
    data: params,
  });
}
