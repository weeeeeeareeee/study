export default function createElement(vnode) {
	let domNode = document.createElement(vnode.sel);
	if (vnode.children?.length > 0) {
		for (let child of vnode.children) {
			let childDome = createElement(child);
			domNode.append(childDome);
		}
	} else {
		domNode.innerText = vnode.text;
	}
	//补充elm属性
	vnode.elm = domNode;
	return domNode;
}
