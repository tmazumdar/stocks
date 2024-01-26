import { useEffect, useState } from "react";
import { ChartBar } from "./chart-bar";
import { ChartInstance } from "./chart-instance";
import { AggregatePoint } from "../../../types";

type ChartPanelProps = {
	savedTickers: Array<string>;
};

export function ChartPanel({ savedTickers }: ChartPanelProps) {
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

	return (
		<>
			<ChartBar
				savedTickers={savedTickers}
				ticker={ticker}
				setTicker={setTicker}
				range={range}
				setRange={setRange}
			></ChartBar>
			<ChartInstance apiData={apiData}></ChartInstance>
		</>
	);
}
