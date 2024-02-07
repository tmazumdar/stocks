import { useEffect, useState } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import { AggregatePoint } from "../../../types";

type ChartInstanceProps = {
	apiError: boolean;
	displayTicker: string;
	apiData: Array<AggregatePoint>;
	showMore: boolean;
};

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

export function ChartInstance({
	apiError,
	displayTicker,
	apiData,
	showMore,
}: ChartInstanceProps) {
	let labels;
	let simpleData: ChartData<"line">;
	let data: ChartData<"line">;
	const dateFormatOptions: Intl.DateTimeFormatOptions = {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	};

	let options: ChartOptions<"line"> = {
		responsive: true,
		plugins: {
			legend: {
				display: apiData && apiData.length > 0,
				position: "top" as const,
			},
			title: {
				display: !!displayTicker,
				text: `${displayTicker} Chart`,
			},
			tooltip: {
				callbacks: {
					label: function (context: any) {
						let label = context.dataset.label || "";
						if (label) {
							label += ": ";
						}
						if (
							context.dataset.label !== "Volume" &&
							context.dataset.label !== "Transactions" &&
							context.parsed.y !== null
						) {
							label += new Intl.NumberFormat("en-US", {
								style: "currency",
								currency: "USD",
							}).format(context.parsed.y);
						} else {
							label += context.formattedValue;
						}
						return label;
					},
				},
			},
		},
		scales: {
			y: {
				type: "linear",
				display: true,
				position: "left",
				title: {
					display: true,
					padding: 4,
					text: "($)",
				},
			},
			y1: {
				type: "linear",
				display: showMore,
				position: "right",
				title: {
					display: true,
					padding: 4,
					text: "# of units",
				},
				// grid line settings
				grid: {
					drawOnChartArea: false, // only want the grid lines for one axis to show up
				},
			},
		},
	};

	if (!!apiData) {
		labels = apiData.map(m => m.t + "");

		if (!showMore) {
			simpleData = {
				labels: apiData.map((m) =>
					new Date(m.t).toLocaleDateString("en-US", dateFormatOptions)
				),
				datasets: [
					{
						label: "Price",
						data: apiData.map(a => a.c),
						borderColor: "rgb(160, 232, 142)",
						tension: 0.3,
						fill: {
							target: "origin",
						},
						borderWidth: 2,
						pointRadius: 1,
						yAxisID: "y",
					},
				],
			};
		}
		else {
			data = {
				labels: apiData.map((m) =>
					new Date(m.t).toLocaleDateString("en-US", dateFormatOptions)
				),
				datasets: [
					{
						label: "High Price",
						data: apiData.map(a => a.h),
						borderColor: "rgb(160, 232, 142)",
						tension: 0.2,
						fill: {
							target: 2,
						},
						borderWidth: 2,
						pointRadius: 1,
						yAxisID: "y",
						showLine: false,
					},
					{
						label: "Volume Weighted Price",
						data: apiData.map(a => a.vw),
						borderColor: "rgb(199, 146, 232)",
						backgroundColor: "rgb(199, 146, 232)",
						tension: 0.2,
						borderWidth: 2,
						pointRadius: 1,
						yAxisID: "y",
					},
					{
						label: "Low price",
						data: apiData.map(a => a.l),
						borderColor: "rgb(255, 124, 92)",
						backgroundColor: "rgb(255, 124, 92)",
						tension: 0.2,
						borderWidth: 2,
						pointRadius: 1,
						yAxisID: "y",
						showLine: false,
					},
					{
						label: "Volume",
						data: apiData.map(a => a.v),
						borderColor: "rgb(94, 129, 171)",
						backgroundColor: "rgb(94, 129, 171)",
						tension: 0.4,
						borderWidth: 3,
						pointRadius: 1,
						yAxisID: "y1",
					},
					{
						label: "Transactions",
						data: apiData.map(a => a.n),
						borderColor: "rgb(224, 229, 271)",
						backgroundColor: "rgb(224, 229, 271)",
						tension: 0.4,
						borderWidth: 3,
						pointRadius: 1,
						yAxisID: "y1",
					},
				],
			};
		}
	}
	return (
		<>
			<div
				style={{
					height: apiError ? "calc(100vh - 242px)" : "calc(100vh - 160px)",
				}}
				className="bg-transparent"
			>
				{apiData && !showMore && <Line options={options} data={simpleData} />}
				{apiData && showMore && <Line options={options} data={data} />}
			</div>
		</>
	);
}
