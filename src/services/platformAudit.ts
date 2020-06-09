import request from '@/utils/request';

// 获取商品列表信息
export async function productList(params: Object) {
  return request('/admin/v1/platformAuditList', {
    params,
  });
}
// 根据id查询商品信息
export async function product(params: any) {
  // return request(`/admin/v1/platformProdDet/${params.id}`);
  return request('/admin/v1/platformProdDet');
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

// 删除产品
export async function deletProduct(params: any) {
  return request('/admin/v1/delete', {
    method: 'delete',
    data: params,
  });
}
// 重新上架产品
export async function resubmit(params: any) {
  return request('/admin/v1/platformAudit', {
    method: 'PUT',
    data: params,
  });
}
