import request from '@/utils/request';

// 查询自提信息
export async function getPickUp(params: Object) {
  return request('/admin/v1/tenant/getPickUp', {
    params,
  });
}
// // 快速分类顺序调整
// export async function reverseCategoryList(params: Object) {
//   return request('/admin/v1/quickCategory/update/order', {
//     method: 'put',
//     data: params,
//   });
// }
// // 删除快速分类
// export async function deleteCategoryItem(params: Object) {
//   return request(`/admin/v1/quickCategory/delete/${params.quickCategoryId}`, {
//     method: 'delete',
//   });
// }
// // 新增快速分类接口
// export async function newCategoryItem(params: Object) {
//   return request('/admin/v1/quickCategory/insert', {
//     method: 'post',
//     data: params,
//   });
// }
// // 编辑快速分类接口
// export async function editorCategoryItem(params: Object) {
//   return request('/admin/v1/quickCategory/update', {
//     method: 'put',
//     data: params,
//   });
// }

// // 改变快速分类状态
// export async function changeCategoryItem(params: Object) {
//   return request('/admin/v1/quickCategory/update/status', {
//     method: 'put',
//     data: params,
//   });
// }
