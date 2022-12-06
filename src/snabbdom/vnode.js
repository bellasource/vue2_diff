// 将参数拼接为虚拟dom对象
export default function vnode(sel, data, children, text, elm) {
  // elm 对应的真实dom
  const key = data.key;
  return { sel, data, children, text, elm, key };
}
