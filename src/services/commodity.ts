import request from '@/utils/request';

// 获取商品列表信息
export async function productList(params: Object) {
  return request('/admin/v1/productList', {
    params,
  });
}
// 根据id查询商品信息
export async function product(params: any) {
  return request(`/admin/v1/product/${params.id}`);
}
// 编辑商品
export async function editorProduct(params: any) {
  return request('/admin/v1/product', {
    method: 'PUT',
    data: params,
  });
}
// 新增商品
export async function newProduct(params: any) {
  return request('/admin/v1/product', {
    method: 'POST',
    data: params,
  });
}

// 获取商品类型的数字字典
export async function productype(params: Object) {
  return request('/admin/v1/category/productype');
}

// 上下架产品
export async function shelve(params: any) {
  return request('/admin/v1/product/shelve', {
    method: 'PUT',
    data: params,
  });
}

// 二期H5后台管理系统
export async function productTemplateList(params: any) {
  return request('/admin/v1/productTemplate/productList', {
    params,
  });
}
