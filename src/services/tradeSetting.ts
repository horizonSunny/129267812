import request from '@/utils/request';

// 查询自提信息
export async function getPickUp(params: Object) {
  return request('/admin/v1/tenant/getPickUp', {
    params,
  });
}
// 设置自提状态
export async function pickUpStatus(params: Object) {
  return request('/admin/v1/tenant/pickUp/status', {
    method: 'put',
    data: params,
  });
}
// 获取不可配送区域
export async function getNonDelivery() {
  return request('/admin/v1/tenant/getNonDelivery');
}
// 设置不可配送区域
export async function setNonDelivery(params: Array) {
  return request('/admin/v1/tenant/setNonDelivery', {
    method: 'post',
    data: params,
  });
}

// 获取运费模版列表数据
export async function freightList(params: Object) {
  return request('/admin/v1/freight/list', {
    params,
  });
}

// 新建模版
export async function newFreight(params: Object) {
  return request('/admin/v1/freight/insert', {
    method: 'post',
    data: params,
  });
}
// 更新模版
export async function updateFreight(params: Object) {
  return request('/admin/v1/freight/update', {
    method: 'put',
    data: params,
  });
}
export async function deleteFreight(params: Object) {
  return request(`/admin/v1/freight/${params.freightTemplateId}`, {
    method: 'delete',
  });
}
