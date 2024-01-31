import { useEffect, useState } from "react";
import { ChartBar } from "./chart-bar";
import { ChartInstance } from "./chart-instance";
import { AggregatePoint } from "../../../types";

type ChartPanelProps = {
	apiData: Array<AggregatePoint>;
	savedTickers: Array<string>;
	ticker: string;
	displayTicker: string;
	apiError: boolean;
	remainingTime: number;
	setRemainingTime: React.Dispatch<React.SetStateAction<number>>;
	setTicker: React.Dispatch<React.SetStateAction<string>>;
	range: string;
	setRange: React.Dispatch<React.SetStateAction<string>>;
};

export function ChartPanel({
	apiData,
	savedTickers,
	ticker,
	displayTicker,
	apiError,
	remainingTime,
	setRemainingTime,
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
				apiError={apiError}
			></ChartBar>
			{apiError && (
				<div role="alert" className="alert shadow-sm alert-warning">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="stroke-info shrink-0 w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path>
					</svg>
					<div>
						<h3 className="font-bold">API limit reached ! 😅</h3>
						<div className="text-xs">
							Max API requests of 5/min exceeded. Please wait and retry 🙏!
						</div>
					</div>
					{remainingTime > 0 && (
						<div
							className="radial-progress text-secondary"
							style={
								{ "--value": (remainingTime * 100) / 30 } as React.CSSProperties
							}
							role="progressbar"
						>
							{remainingTime}s
						</div>
					)}
				</div>
			)}
			<ChartInstance
				apiError={apiError}
				displayTicker={displayTicker}
				apiData={apiData}
			></ChartInstance>
		</>
	);
}
