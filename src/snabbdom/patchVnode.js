import createElement from "./createElement.js";
import updateChildren from "./updateChildren.js";
// 针对同一节点，后续的操作
export default function patchVnode(oldVnode, newVnode) {
  // a、新旧虚拟节点是同一对象?
  if (oldVnode === newVnode) return;
  // b、新虚拟DOM无有text属性？

  if (newVnode.text && (!newVnode.children || !newVnode.children.length)) {
    // 新虚拟DOM有text属性
    if (newVnode.text !== oldVnode.text) {
      // 新旧文本不相同，更新DOM
      console.log(oldVnode, "oldVnode");
      oldVnode.elm.innerText = newVnode.text;
    }
    newVnode.elm = oldVnode.elm;
  } else {
    // 新虚拟DOM无text属性，则说明新虚拟DOM有children属性
    // c、旧虚拟DOM有children属性吗？
    if (oldVnode.children && oldVnode.children.length) {
      console.log("新老dom都有children");
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
    } else {
      // 旧虚拟DOM无children，新虚拟DOM有children,
      // 具体步骤：1.清空老节点，2.根据children创建 插入新子元素
      oldVnode.elm.innerHTML = "";
      console.log(oldVnode.elm, "oldVnode.elm");
      for (let i = 0; i < newVnode.children.length; i++) {
        const dom = createElement(newVnode.children[i]);
        oldVnode.elm.appendChild(dom);
      }
    }
    newVnode.elm = oldVnode.elm;
  }
}
