function orderStatus(status: Number) {
  switch (status) {
    case -1:
      return '申请退款';
    case -2:
      return '已退款';
    case 0:
      return '待付款';
    case 1:
      return '待审核';
    case 2:
      return '待发货';
    case 3:
      return '已发货';
    case 4:
      return '交易成功';
    case 5:
      return '已取消';
    case 6:
      return '交易成功';
    default:
      return '';
  }
}

export { orderStatus };
