// import $ from 'jquery'
import './assets/style/css/index.css';
import flowers from './assets/img/1.jpg';

export default {
	setH1() {
		// $('body').append('<h1>你好</h1>');
		document.body.insertAdjacentHTML('beforeend', '<h1>你好11111111</h1>');
		document.body.insertAdjacentHTML('beforeend', `<img src="${flowers}" />`);
	},
};
