import request from '@/utils/request';

// 获取商品种类数据
export async function categoryType(params: any) {
  return request('/admin/v1/category/getCategorys', {
    params,
  });
}
// 根据第三级分类id查询商品信息
export async function categoryProduct(params: any) {
  return request('/admin/v1/category/search/categoryProduct', {
    params,
  });
}
// 从分类中移除产品
export async function deleteCategory(params: any) {
  return request('/admin/v1/category/delete', {
    method: 'delete',
    data: params,
  });
}
// 分类顺序调整
export async function reorderCategory(params: any) {
  return request('/admin/v1/category/update/order', {
    method: 'PUT',
    data: params,
  });
}
// 添加分类接口
export async function categoryInsert(params: any) {
  return request('/admin/v1/category/insert', {
    method: 'POST',
    data: params,
  });
}

// 删除分类接口
export async function deleteClassify(params: any) {
  return request(`/admin/v1/category/delete/${params}`, {
    method: 'delete',
  });
}
// 设置分类是否可见
export async function categoryShow(params: any) {
  return request('/admin/v1/category/isShow', {
    method: 'PUT',
    data: params,
  });
}
// 编辑分类名称
export async function editorClassify(params: any) {
  return request('/admin/v1/category/update', {
    method: 'PUT',
    data: params,
  });
}
