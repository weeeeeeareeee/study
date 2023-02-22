import h from './dom/h';
import patch from './dom/patch';

let container = document.getElementById('container');

let vnode1 = h('h1', {}, '你好');

let vnode2 = h('ul', {}, [h('li', {}, 'a'), h('li', {}, 'b'), h('li', {}, 'c'), h('li', {}, 'd')]);

patch(container, vnode1);
