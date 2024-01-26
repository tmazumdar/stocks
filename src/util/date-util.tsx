export const getPreviousBusinessDayDate = () => {
	let date = new Date();
	let dayOfWeek = date.getDay();
	switch (dayOfWeek) {
		case 1: // monday: get last friday's date
			return new Date(date.setDate(date.getDate() - 3));
		case 0: // sunday: get last friday's date
			return new Date(date.setDate(date.getDate() - 2));
		default: // any other day: get previous day's date
			return new Date(date.setDate(date.getDate() - 1));
	}
};

export const getFormattedDate = (date: Date) => {
	// get YYYY-MM-DD for api param
	var year = date.toLocaleString("default", { year: "numeric" });
	var month = date.toLocaleString("default", { month: "2-digit" });
	var day = date.toLocaleString("default", { day: "2-digit" });
	return year + "-" + month + "-" + day;
};
