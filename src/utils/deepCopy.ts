export default function deepCopy(obj) {
  const _obj = Array.isArray(obj) ? [] : {};
  for (const i in obj) {
    _obj[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i];
  }
  return _obj;
}
