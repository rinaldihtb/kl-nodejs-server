class Helper {
	private static instance : Helper;

	private constructor() {}
    
	public static getInstance() : Helper{
		if(!Helper.instance) {
			Helper.instance = new Helper();
		}

		return Helper.instance;
	}

	public getCurrentDate() {
		const currentDate = new Date();
		return currentDate;
	}
	
	// METHODS
	public getLoggingDate() : string{
		const currentDate = this.getCurrentDate();
		const dateFormatted = `${currentDate.getUTCFullYear()}-${currentDate.getUTCMonth()}-${currentDate.getUTCDate()} ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()}:${currentDate.getUTCSeconds()}`;

		return dateFormatted;
	}
}

export default Helper.getInstance();
