export class Test {
	list = [];
	constructor(list) {
		this.list = list;
	}

	/**
	 *
	 * @param {DragEvent} e
	 * @param {*} item
	 */
	dragStart(e, index) {
		e.dataTransfer.setData('text', index); // or whatever you want to use to store the file in the data store (e.g. URL)
	}

	/**
	 *
	 * @param {DragEvent} e
	 * @param {*} item
	 */
	handleDrop(e, index) {
		const startIndex = e.dataTransfer.getData('text');
		let temp = this.list[startIndex];
		this.list[startIndex] = this.list[index];
		this.list[index] = temp;
		console.log(this.list);
	}
}
