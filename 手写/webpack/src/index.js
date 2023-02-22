import m1 from './m1.js';
import m2 from './m2.js';

m1.setH1();
m2.sayHello();
document.body.insertAdjacentHTML('beforeend', '<h1>你好</h1>');
document.body.onclick = () => {
	alert('11111');
};
