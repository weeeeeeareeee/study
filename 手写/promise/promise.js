class MyPromise {
	constructor(executor) {
		this.state = 'pending'; //promise状态
		this.value = undefined; //成功的值
		this.msg = undefined; //失败的值

		// 成功失败回调
		let resolve = (v) => {
			if (this.state === 'pending') {
				// 状态驱动，不能够随意更改
				this.state = 'fulfilled'; //更新状态
				this.value = v; //记录成功的信息
			}
		};
		let rejected = (e) => {
			if (this.state === 'pending') {
				this.state = 'rejected';
				this.msg = e; //记录失败的原因
			}
		};
		try {
			executor(resolve, rejected);
		} catch (err) {
			// console.error(err);
			rejected(err)
		}
	}
	then(onFulfilled, onRejected) {
		if (this.state === 'fulfilled') {
			onFulfilled(this.value);
		}
		if (this.state === 'rejected') {
			onRejected(this.msg);
		}
	}
}
