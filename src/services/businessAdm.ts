import request from '@/utils/request';

// 查询订单列表
export async function queryOrederList(params) {
  console.log('列表最终参数为:', params);
  return request('/order/sysOrder/orderList', {
    method: 'get',
    params,
  });
}
// 根据订单号查询订单
export async function getOrder(params) {
  console.log('根据订单号查询订单', params);
  return request('/order/sysOrder/getOrder', {
    method: 'get',
    params,
  });
}
// 取消订单
export async function cancelOrder(params) {
  return request('/order/order/cancel', {
    method: 'put',
    data: params,
  });
}
// 退款 refundStatus 1为同意退款，2为拒绝退款
export async function refundOrder(params) {
  return request('/order/sysOrder/refundOrder', {
    method: 'put',
    data: params,
  });
}
// 取货码核销
export async function pickupCode(params) {
  return request('/order/sysOrder/check/pickupCode', {
    method: 'post',
    data: params,
  });
}
// 查询订单列表
// export async function insertBusiness(params) {
//   return request('/admin/v1/tenant', {
//     method: 'post',
//     data: params,
//   });
// }

// export async function saveBusiness(params) {
//   return request('/admin/v1/tenant', {
//     method: 'put',
//     data: params,
//   });
// }

// export async function queryOperation(params) {
//   return request('/admin/v1/log', {
//     method: 'get',
//     params,
//   });
// }
