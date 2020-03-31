// 节流
let valid = true;
function throttle(fn, delay) {
  return function() {
    if (!valid) {
      // 休息时间 暂不接客
      return false;
    }
    // 工作时间，执行函数并且在间隔期内把状态位设为无效
    valid = false;
    setTimeout(() => {
      fn();
      valid = true;
    }, delay);
  };
}
// 防抖
let timer = null; // 借助闭包
function debounce(fn, delay) {
  return function() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, delay); // 简化写法
  };
}
export { throttle, debounce };
