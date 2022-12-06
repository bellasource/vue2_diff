import vnode from "./vnode.js";

/* 
h函数接收参数的情况
1. h('div', {}, '文字')
2. h('div', {}, [h()])
3. h('div', {}, h())
*/
export default function h(sel, data, c) {
  if (arguments.length !== 3) {
    throw new Error("必须传入3个参数");
  }
  if (typeof c === "string" || typeof c === "number") {
    // 第一种情况
    return vnode(sel, data, undefined, c, undefined);
  } else if (Array.isArray(c)) {
    // 第二种情况
    for (let i = 0; i < c.length; i++) {
      // 循环遍历子元素，如果不是vnode对象，则抛出异常
      if (typeof c[i] !== "object" || !c[i].hasOwnProperty("sel")) {
        throw new Error("传入的数组参数不是h函数");
      }
    }
    return vnode(sel, data, c, undefined, undefined);
  } else if (typeof c === "object" && c.hasOwnProperty("sel")) {
    // 第三种情况
    return vnode(sel, data, [c], undefined, undefined);
  } else {
    throw new Error("参数异常");
  }
}
