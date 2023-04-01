import vnode from './vnode';
import createElement from './createElement'
import patchVnode from './patchVnode'
export default function (oldVnode, newVnode) {
	//判断是否为虚拟节点，进行转换
	if (oldVnode.sel == undefined) {
		oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
	}
	//判断 旧的虚拟节点与新的虚拟节点是否一致
	if (oldVnode.sel === newVnode.sel) {
		patchVnode(oldVnode,newVnode);
	} else {
		//直接删除，插入新节点
		//创建新节点
		let newVnodeElm = createElement(newVnode);
		//获取旧的虚拟节点的elm，elm为真正的节点
		let oldVnodeElm = oldVnode.elm;
		if (newVnodeElm) {
			oldVnodeElm.parentNode.insertBefore(newVnodeElm,oldVnodeElm);
		}
		oldVnodeElm.parentNode.removeChild(oldVnodeElm);

	}
}