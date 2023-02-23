import createElement from './createElement';
import updateChildren from './updataChildren'

export default function patchVnode(oldVnode, newVnode) {
	//分新节点有没有子节点
	if (newVnode.children === undefined) {
		if (newVnode.text !== oldVnode.text) {
			oldVnode.elm.innerText = newVnode.text;
		}
	} else {
		//判断旧节点有没有子节点
		if (oldVnode.children?.length > 0) {
			updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
		} else {
			oldVnode.elm.innerHTML = '';
			for (let child of newVnode.children) {
				let childDom = createElement(child);
				oldVnode.elm.append(childDom);
			}
		}
	}
}
