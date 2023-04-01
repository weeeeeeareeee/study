import h from './dom/h';
import patch from './dom/patch';

let container = document.getElementById('container');
let btn =document.getElementById('btn')
let vnode1 = h('div', {}, '你好');

let vnode2 = h('ul', {}, [
	h('li', { key: 'a' }, 'a'),
	h('li', { key: 'b' }, 'b'),
	h('li', { key: 'c' }, 'c'),
]);

patch(container, vnode2);


let vnode3 = h('ul', {}, [
	h('li', { key: 'c' }, 'c'),
	h('li', { key: 'b' }, 'b'),
	h('li', { key: 'e' }, 'e'),
	h('li', { key: 'a' }, 'a'),
	h('li', { key: 'd' }, 'd'),
])

btn.onclick = () => {
patch(vnode2, vnode3);
	
}