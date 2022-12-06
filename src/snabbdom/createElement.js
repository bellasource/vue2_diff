/*
 * 创建DOM
 * @return:根据虚拟dom创建的dom节点（未插入真实dom中）
 * @param: vnode 需要创建的新的虚拟DOM
 */
export default function createElement(vnode) {
  const domNode = document.createElement(vnode.sel);
  vnode.elm = domNode;
  if (vnode.text !== "" && (!vnode.children || !vnode.children.length)) {
    // 1、是孤儿节点 只有文本
    domNode.innerText = vnode.text;
  } else if (Array.isArray(vnode.children) && vnode.children.length) {
    // 2、内部含有子节点，需要递归创建子节点
    for (let i = 0; i < vnode.children.length; i++) {
      vnode.elm.appendChild(createElement(vnode.children[i]));
    }
  }
  return vnode.elm;
}
