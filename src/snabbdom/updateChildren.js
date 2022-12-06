import patchVnode from "./patchVnode.js";
import createElement from "./createElement.js";
export const checkSameVnode = (pre, next) => {
  return pre.sel === next.sel && pre.key === next.key;
};
console.log(checkSameVnode, "checkSameVnode");
/*
 * 对比新旧虚拟DOM子节点，并更新
 * @return:none
 * @param:parentElm {HTMLELEMENT} 旧真实DOM节点
 * @param:oldCh {Array} 旧虚拟DOM节点children
 * @param:newCh {Array} 新虚拟DOM节点children
 */
export default function updateChildren(parentElm, oldCh, newCh) {
  // 新前
  let newStartIdx = 0;
  // 新后
  let newEndIdx = newCh.length - 1;
  // 旧前
  let oldStartIdx = 0;
  // 旧后
  let oldEndIdx = oldCh.length - 1;
  let newStartVnode = newCh[newStartIdx];
  let newEndVnode = newCh[newEndIdx];
  let oldStartVnode = oldCh[oldStartIdx];
  let oldEndVnode = oldCh[oldEndIdx];
  // 存放旧虚拟节点 [key]:index
  const keyIndexMap = {};
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    console.log("while死循环了吗");
    // debugger;
    console.log(oldEndVnode, oldEndVnode.elm, newEndVnode);
    // 遇到不存在的节点，跳过这一项
    if (!oldStartVnode) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (!oldEndVnode) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (!newStartVnode) {
      newStartVnode = newCh[++newStartIdx];
    } else if (!newEndVnode) {
      newEndVnode = newCh[--newEndIdx];
    } else if (checkSameVnode(newStartVnode, oldStartVnode)) {
      // 匹配条件一：新前与旧前
      // 1、比较其子节点  2、新前，旧前指针 ++，新前、旧前节点重新取值
      patchVnode(oldStartVnode, newStartVnode);
      newStartVnode = newCh[++newStartIdx];
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (checkSameVnode(newEndVnode, oldEndVnode)) {
      // 匹配条件二： 新后与旧后
      // 1、比较其子节点  2、新后，旧后指针 --，新后，旧后节点重新取值
      patchVnode(oldEndVnode, newEndVnode);
      newEndVnode = newCh[--newEndIdx];
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (checkSameVnode(newEndVnode, oldStartVnode)) {
      // 匹配条件三： 新后与旧前
      // 1、比较其子节点  2、旧前节点移动到旧未处理节点后 3、新后--，旧前指针++，新后、旧前节点重新取值
      console.log(oldEndVnode.elm, oldEndVnode.elm.nextSibling, "之前");
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      console.log(oldEndVnode.elm, oldEndVnode.elm.nextSibling, "之后");
      patchVnode(oldStartVnode, newEndVnode);
      newEndVnode = newCh[--newEndIdx];
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (checkSameVnode(newStartVnode, oldEndVnode)) {
      // 匹配条件四： 新前与旧后
      // 1、比较其子节点  2、旧后节点移动到旧未处理节点前 3、新前++，旧后指针--，新后、旧前节点重新取值
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm.nextSibling);
      patchVnode(oldStartVnode, newEndVnode);
      newStartVnode = newCh[++newStartIdx];
      oldEndVnode = oldCh[--oldEndIdx];
    } else {
      // 都没有命中，需要从newStartIdx循环查找旧节点
      if (!keyIndexMap) {
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          const key = oldCh[i].key;
          keyIndexMap[key] = i;
        }
      }
      const idxInOld = keyIndexMap[newStartVnode.key];
      if (idxInOld === undefined) {
        // 不能再oldVnode中找到对应的项，需要 新增DOM节点->插入->未处理节点前
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
      } else {
        // 能在oldVnode中找到对应的项，需要 移动DOM节点 -> 未处理节点前
        const oldNeedMoveNode = oldCh[idxInOld];
        oldCh[idxInOld] = undefined;
        patchVnode(oldNeedMoveNode, newStartVnode);
        parentElm.insertBefore(oldNeedMoveNode.elm, oldStartVnode.elm);
      }
      newStartVnode = newCh[++newStartIdx];
    }
  }
  // 结束了循环
  // 需要判断是新子节点还是旧子节点先结束循环（先不满足循环条件)
  if (oldStartIdx > oldEndIdx) {
    /* 
      1、当旧子节点先结束循环
      2、说明新子节点还有未被处理的节点，直接插入到旧节点的未处理节点前
    */

    let before = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].elm : null;
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      parentElm.insertBefore(createElement(newCh[i]), before);
    }
  } else if (newStartIdx > newEndIdx) {
    /* 
      1、新节点先结束循环
      2、说明旧节点还有未被处理的节点，直接删除
    */
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      parentElm.removeChild(oldCh[i].elm);
    }
  }
}
