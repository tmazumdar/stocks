import { useEffect, useState } from "react";
import { ChartBar } from "./chart-bar";
import { ChartInstance } from "./chart-instance";

type ChartPanelProps = {
	savedTickers: Array<string>;
};

// useEffect
// window.api.fetchAggregates("AAPL", 1, "day", "2023-01-09", "2023-01-23").then((res: any) => {
//     console.log(JSON.parse(res).results);
// });

export function ChartPanel({ savedTickers }: ChartPanelProps) {
	const [ticker, setTicker] = useState("");
	const [range, setRange] = useState("D");

	useEffect(() => {
		console.log(ticker);
	}, [ticker]);
	useEffect(() => {
		console.log(range);
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
			<ChartInstance></ChartInstance>
		</>
	);
}
