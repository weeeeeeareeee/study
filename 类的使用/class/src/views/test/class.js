export class Test {
	id = 1

	list = [1,2,3,4]
	constructor() {
		
	}

	dragStart(e, item) {
		console.log(e);
		console.log(item);
	}
}