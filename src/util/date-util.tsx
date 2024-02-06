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

export const getStartTime = (endDate: Date, range: string) => {
	let startDate;
	let date = new Date(endDate);
	date.setHours(9, 30, 0, 0); // set to US market open time

	switch (range) {
		case "D":
			date.setDate(date.getDate() - 1);
			startDate = new Date(date);
			break;
		case "W":
			startDate = new Date(date.setDate(date.getDate() - 7));
			break;
		case "M":
			startDate = new Date(date.setMonth(date.getMonth() - 1));
			break;
		case "6M":
			startDate = new Date(date.setMonth(date.getMonth() - 6));
			break;
		case "YTD":
			date.setMonth(0);
			date.setDate(1);
			startDate = new Date(date);
			break;
		case "Y":
			startDate = new Date(date.setFullYear(date.getFullYear() - 1));
			break;
		case "2Y":
			startDate = new Date(date.setFullYear(date.getFullYear() - 2));
			break;
		default:
			break;
	}

	return startDate.getTime();
};

export const getTimespan = (range: string) => {
	//	these are set to optimize resolution of datapoints when fetching prices
	//  (https://polygon.io/blog/aggs-api-updates)
	switch (range) {
		case "D":
			return "minute";
		case "W":
			return "minute";
		case "M":
			return "day";
		case "6M":
			return "week";
		case "YTD":
			return "day";
		case "Y":
			return "week";
		case "2Y":
			return "week";
		default:
			return "day";
	}
};

export const getTimespanMultiplier = (range: string) => {
	//	these are set to optimize resolution of datapoints when fetching prices
	//  (https://polygon.io/blog/aggs-api-updates)
	switch (range) {
		case "D":
			return 15;
		case "W":
			return 30;
		case "M":
			return 1;
		case "6M":
			return 1;
		case "YTD":
			return 1;
		case "Y":
			return 1;
		case "2Y":
			return 1;
		default:
			return 365; // unused so its irrelevant
	}
};
