import request from '@/utils/request';

export async function queryBusiness(params) {
  console.log('列表最终参数为:', params);
  return request('/order/sysOrder/orderList', {
    method: 'get',
    params,
  });
}

export async function insertBusiness(params) {
  return request('/admin/v1/tenant', {
    method: 'post',
    data: params,
  });
}

export async function saveBusiness(params) {
  return request('/admin/v1/tenant', {
    method: 'put',
    data: params,
  });
}

export async function switchStatus(params) {
  return request('/admin/v1/tenant/status', {
    method: 'put',
    data: params,
  });
}

export async function queryChannel() {
  return request('/admin/v1/tenant/channel', {
    method: 'get',
  });
}

export async function queryOperation(params) {
  return request('/admin/v1/log', {
    method: 'get',
    params,
  });
}
