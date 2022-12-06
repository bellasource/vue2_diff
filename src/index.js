import h from "./snabbdom/h.js";
import patch from "./snabbdom/patch.js";

const container = document.getElementById("container");

const vnode1 = h("ul", {}, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B"),

  h("li", { key: "C" }, "C"),
  h("li", { key: "D" }, "D")
]);
const vnode2 = h("ul", {}, [
  h("li", { key: "B" }, "B"),
  h("li", { key: "C" }, "C")
]);
patch(container, vnode1);
console.log(vnode1, "vnode1");
document.querySelector("#button").onclick = function () {
  debugger;
  patch(vnode1, vnode2);
};
