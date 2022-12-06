import vnode from "./vnode.js";
import createElement from "./createElement.js";
import patchVnode from "./patchVnode.js";
export default function patch(oldVnode, newVnode) {
  // 1、判断是否是dom节点，如果是dom节点，包装为vnode
  if (!oldVnode.hasOwnProperty("sel")) {
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(),
      {},
      [],
      undefined,
      oldVnode
    );
  }
  // 2、判断新旧vnode是否为同一节点
  if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {
    patchVnode(oldVnode, newVnode);
    // 是同一节点
  } else {
    // 不是同一节点，则删除旧DOM节点，插入新DOM节点
    const newVnodeElm = createElement(newVnode);
    if (newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
    }
  }
}
