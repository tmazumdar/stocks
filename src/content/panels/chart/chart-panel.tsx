import { useEffect, useState } from "react";
import { ChartBar } from "./chart-bar";
import { ChartInstance } from "./chart-instance";
import { AggregatePoint } from "../../../types";

type ChartPanelProps = {
	apiData: Array<AggregatePoint>;
	savedTickers: Array<string>;
	ticker: string;
	setTicker: React.Dispatch<React.SetStateAction<string>>;
	range: string;
	setRange: React.Dispatch<React.SetStateAction<string>>;
};

export function ChartPanel({
	apiData,
	savedTickers,
	ticker,
	setTicker,
	range,
	setRange,
}: ChartPanelProps) {
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
