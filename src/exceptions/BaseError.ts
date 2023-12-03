abstract class BaseError extends Error {
	abstract statusCode: number;

	protected constructor() {
		super();
	}

	log(): void { console.log(`(${this.statusCode}) ${this.name} : ${this.message}`);
	}
}

export default BaseError;
