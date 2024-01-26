import { useEffect, useState } from "react";
import { BottomNav } from "./bottom-nav";
import { ChartPanel } from "./panels/chart/chart-panel";
import { HomePanel } from "./panels/home/home-panel";
import { SearchPanel } from "./panels/search/search-panel";

import { TickerRow, TickerStat } from "../types";
import {
	getPreviousBusinessDayDate,
	getFormattedDate,
} from "../util/date-util";

export function Content() {
	const [activePanelIndex, setActivePanelIndex] = useState(2);
	const [savedTickers, setSavedTickers] = useState<Array<string>>([]);
	const [tickerRows, setTickerRows] = useState<Array<TickerRow>>([]);
	const [tickerStats, setTickerStats] = useState<TickerStat[]>([]);
	const [ticker, setTicker] = useState("");
	const [range, setRange] = useState("D");
	const [apiData, setApiData] = useState([]);

	useEffect(() => {
		console.log(apiData);
	}, [apiData]);
	useEffect(() => {
		//console.log(ticker);
		console.log("ticker: ", ticker);
		if (ticker.length > 0) {
			window.api
				.fetchAggregates(ticker, 10, "minute", "2024-01-25", "2024-01-26", 1250)
				.then((res: any) => {
					setApiData(JSON.parse(res).results);
				});
		}
	}, [ticker]);
	useEffect(() => {
		//console.log(range);
	}, [range]);

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
