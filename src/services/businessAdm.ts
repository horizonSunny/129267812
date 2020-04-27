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
// 订单审核通过
export async function audit(params) {
  return request('/order/sysOrder/audit', {
    method: 'put',
    data: params,
  });
}
// 获取快递公司列表
export async function shipper(params) {
  return request('/admin/v1/shipper', {
    method: 'get',
    params,
  });
}
// 发货
export async function deliverGoods(params) {
  return request('/order/sysOrder/deliverGoods', {
    method: 'put',
    data: params,
  });
}

// 根据快递单号查询物流轨迹
export async function getTraces(params) {
  return request('/admin/v1/shipper/traces', {
    method: 'get',
    params,
  });
}
// 导出订单接口
export async function exportOrderList(params) {
  return request('/order/sysOrder/exportOrderList', {
    method: 'get',
    params,
  });
}
