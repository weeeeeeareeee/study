import patchVnode from './patchVnode';
import createElement from './createElement';

//判断是否为同一节点
function sameVnode(vNode1, vNode2) {
	return vNode1.key == vNode2.key;
}

/**
 *
 * @param {} parentElm 父节点
 * @param {[]} oldCh 旧元素
 * @param {[]} newCH 新元素
 */
export default function updateChildren(parentElm, oldCh, newCh) {
	//循环对比 新前后前-新后旧后-新后旧前-新前旧后-查找

	// 定义指针
	let oldStartIdx = 0;
	let newStartIdx = 0;
	let oldEndIdx = oldCh.length - 1;
	let newEndIdx = newCh.length - 1;

	//指针指向的虚拟节点
	let oldStartVnode = oldCh[0];
	let oldEndVnode = oldCh[oldEndIdx];
	let newStartVnode = newCh[0];
	let newEndVnode = newCh[newEndIdx];

	//指针判断循环条件
	while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
		if (oldStartVnode == undefined) {
			oldStartVnode = oldCh[++oldStartIdx];
		} else if (oldEndVnode == undefined) {
			oldEndVnode = oldCh[++oldEndIdx];
		} else if (sameVnode(oldStartVnode, newStartVnode)) {
			//新前后前
			patchVnode(oldStartVnode, newStartVnode);
			//更新新组件elm
			if (newStartVnode) newStartVnode.elm = oldStartVnode?.elm;
			//匹配完成指针增加
			oldStartVnode = oldCh[++oldStartIdx];
			newStartVnode = newCh[++newStartIdx];
		} else if (sameVnode(oldEndVnode, newEndVnode)) {
			//新后旧后
			patchVnode(oldEndVnode, newEndVnode);
			//更新新组件elm
			if (newEndVnode) newEndVnode.elm = oldEndVnode?.elm;
			//匹配完成指针增加
			oldStartVnode = oldCh[--oldEndIdx];
			newStartVnode = newCh[--newEndIdx];
		} else if (sameVnode(oldStartVnode, newEndVnode)) {
			//新后旧前
			patchVnode(oldStartVnode, newEndVnode);
			//更新新组件elm
			if (newEndVnode) newEndVnode.elm = oldStartVnode?.elm;
			//旧前指定的节点移动到旧后指向的节点后
			console.log(oldEndVnode.elm.nextSibling);

			parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
			//匹配完成指针增加
			oldStartVnode = oldCh[++oldStartIdx];
			newEndVnode = newCh[--newEndIdx];
		} else if (sameVnode(newStartVnode, oldEndVnode)) {
			//新前旧后
			patchVnode(oldEndVnode, newStartVnode);
			//更新新组件elm
			if (newStartVnode) newStartVnode.elm = oldEndVnode?.elm;
			//旧前指定的节点移动到旧后指向的节点后
			parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
			//匹配完成指针增加
			oldEndVnode = oldCh[--oldEndIdx];
			newStartVnode = newCh[++newStartIdx];
		} else {
			//查找
			const keyMap = {};
			for (let i = oldStartIdx; i <= oldEndIdx; i++) {
				const key = oldCh[i]?.key;
				if (key) keyMap[key] = i;
			}
			//在旧节点中找到新的节点
			let idxInOld = keyMap[newStartVnode.key];
			if (idxInOld) {
				//有说明新旧节点都存在，只需要挪动位置
				const elmMove = oldCh[idxInOld];
				patchVnode(elmMove, newStartVnode);
				//处理过后的旧节点旧重置为undefined
				oldCh[idxInOld] = undefined;
				parentElm.insertBefore(elmMove.elm, oldStartVnode.elm);
			} else {
				//没有就创建
				parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
			}
			//新数据指针+1
			newStartVnode = newCh[++newStartIdx];
		}
	}

	//循环外只有新增删除
	if (oldStartIdx > oldEndIdx) {
		//新增
		const before = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].elm : null;
		for (let i = newStartIdx; i <= newEndIdx; i++) {
			parentElm.insertBefore(createElement(newCh[i]), before);
		}
	} else {
		//删除
		for (let i = oldStartIdx; i <= oldEndIdx; i++) {
			parentElm.removeChild(oldCh[i].elm);
		}
	}
}
