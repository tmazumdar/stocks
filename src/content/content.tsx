import { useEffect, useState } from "react";
import { BottomNav } from "./bottom-nav";
import { ChartPanel } from "./panels/chart/chart-panel";
import { HomePanel } from "./panels/home/home-panel";
import { SearchPanel } from "./panels/search/search-panel";

import { TickerRow, TickerStat } from "../types";
import {
	getPreviousBusinessDayDate,
	getFormattedDate,
	getStartTime,
	getTimespan,
	getTimespanMultiplier,
} from "../util/date-util";

export function Content() {
	const [activePanelIndex, setActivePanelIndex] = useState(0);
	const [savedTickers, setSavedTickers] = useState<Array<string>>([]);
	const [tickerRows, setTickerRows] = useState<Array<TickerRow>>([]);
	const [tickerStats, setTickerStats] = useState<TickerStat[]>([]);
	const [ticker, setTicker] = useState("");
	const [displayTicker, setDisplayTicker] = useState("");
	const [apiError, setApiError] = useState(false);
	const [range, setRange] = useState("D");
	const [apiData, setApiData] = useState([]);
	const [remainingTime, setRemainingTime] = useState(0);

	useEffect(() => {
		console.log(ticker);

		if (ticker.length > 0) {
			window.api
				.fetchAggregates(
					ticker,
					getTimespanMultiplier(range),
					getTimespan(range),
					getStartTime(getPreviousBusinessDayDate(), range),
					getPreviousBusinessDayDate().getTime(),
					5000 // number of base aggregates queried (15-min chunks)
				)
				.then((response: any) => {
					var response = JSON.parse(response);
					if (response.status == "OK") {
						setDisplayTicker(response.ticker);
						console.log("results: ", response);
						setApiError(false);
						setApiData(response.results);
						setRemainingTime(0);
					} else {
						setApiError(true);
						setRemainingTime(remainingTime + 30);
						console.log("results: ", response);
					}
				});
		}
	}, [ticker, range]);

	useEffect(() => {
		// load tickers from preferences file, this is needed for SearchPanel
		window.api.loadTickers().then((res: string) => {
			setSavedTickers(JSON.parse(res));
		});
	}, []);

	useEffect(() => {
		// load prev closing data
		let prevBusinessDate = getPreviousBusinessDayDate();
		let prevBusinessDateFormatted = getFormattedDate(prevBusinessDate);

		window.api
			.fetchGroupedDaily(prevBusinessDateFormatted)
			.then((res: string) => {
				let statsArray = JSON.parse(res);
				// populate percent high/low
				statsArray.forEach((s: TickerStat) => {
					s.cp = ((s.c - s.o) / s.o) * 100;
				});
				setTickerStats(statsArray);
			});
	}, [savedTickers]);

	setTimeout(() => {
		if (remainingTime > 0) {
			console.log("subtracting:", remainingTime);
			setRemainingTime(remainingTime - 1);
			if (remainingTime === 1) setApiError(false);
		}
	}, 1000);

	const getActivePanel = (panelIndex: number) => {
		if (panelIndex === 0) {
			return (
				<HomePanel
					tickerStats={tickerStats}
					setSavedTickers={setSavedTickers}
				></HomePanel>
			);
		} else if (panelIndex === 1) {
			return (
				<SearchPanel
					savedTickers={savedTickers}
					tickerRows={tickerRows}
					setSavedTickers={setSavedTickers}
					setTickerRows={setTickerRows}
				></SearchPanel>
			);
		} else if (panelIndex === 2) {
			return (
				<ChartPanel
					savedTickers={savedTickers}
					ticker={ticker}
					range={range}
					displayTicker={displayTicker}
					apiError={apiError}
					remainingTime={remainingTime}
					setRemainingTime={setRemainingTime}
					apiData={apiData}
					setTicker={setTicker}
					setRange={setRange}
				></ChartPanel>
			);
		}
	};

	return (
		<div>
			{getActivePanel(activePanelIndex)}
			<BottomNav
				activePanelIndex={activePanelIndex}
				setActivePanelIndex={setActivePanelIndex}
			></BottomNav>
		</div>
	);
}
