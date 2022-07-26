/**
 * 合并两个对象到obj1
 * deep: 递归深度
 * overwrite: 是否赋值
 * del: 是否删除obj1中obj2不存在的key
 * rtn: 是否返回obj1
 */

// 递归可选
export type DeepPartial<T> = T extends Object
? { [P in keyof T]?: DeepPartial<T[P]> }
: T;

export default function merge<T>(obj1: T, obj2 = <DeepPartial<T> | T>{}, { deep = 1, overwrite = true, del = false, rtn = true } = {}) {
  deep--;
  if (del) {
    const dels = Object.keys(obj1).filter(item => !Object.keys(obj2).includes(item));
    for (const key of dels) delete obj1[key];
  }
  for (const [key, val] of Object.entries(obj2)) {
    if (!overwrite && ![null, undefined].includes(obj1[key])) continue;
    if (typeof val == "object" && deep > 0) {
      (typeof obj1[key] == "object") || (obj1[key] = {});
      merge(obj1[key], val, { deep, overwrite, del, rtn });
    } else {
      obj1[key] = val;
    }
  }
  return rtn ? obj1 : "";
}

