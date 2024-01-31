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
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import { AggregatePoint } from "../../../types";

type ChartInstanceProps = {
	apiError: boolean;
	displayTicker: string;
	apiData: Array<AggregatePoint>;
};

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export function ChartInstance({
	apiError,
	displayTicker,
	apiData,
}: ChartInstanceProps) {
	//const labels = ["January", "February", "March", "April", "May", "June", "July"];
	let labels;
	let data: ChartData<"line">;

	let options: ChartOptions<"line"> = {
		responsive: true,
		plugins: {
			legend: {
				display: apiData && apiData.length > 0,
				position: "top" as const,
			},
			//datalabels: {},
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
						console.log(context);
						if (
							context.dataset.label !== "Volume" &&
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
				display: true,
				position: "right",
				title: {
					display: true,
					padding: 4,
					text: "Transactions",
				},
				// grid line settings
				grid: {
					drawOnChartArea: false, // only want the grid lines for one axis to show up
				},
			},
		},
	};

	if (!!apiData) {
		labels = apiData.map((m) =>
			new Date(m.t).toLocaleDateString("en-US", {
				day: "2-digit",
				month: "short",
				hour: "2-digit",
				minute: "2-digit",
			})
		);

		data = {
			labels,
			datasets: [
				{
					label: "High Price",
					data: labels.map((l) => {
						return apiData.filter((m) => {
							return (
								new Date(m.t).toLocaleDateString("en-US", {
									day: "2-digit",
									month: "short",
									hour: "2-digit",
									minute: "2-digit",
								}) === l
							);
						})[0].h;
					}),
					borderColor: "green",
					backgroundColor: "green",
					yAxisID: "y",
				},
				{
					label: "Volume Weighted Price",
					data: labels.map((l) => {
						return apiData.filter((m) => {
							return (
								new Date(m.t).toLocaleDateString("en-US", {
									day: "2-digit",
									month: "short",
									hour: "2-digit",
									minute: "2-digit",
								}) === l
							);
						})[0].vw;
					}),
					borderColor: "yellow",
					backgroundColor: "yellow",
					yAxisID: "y",
				},
				{
					label: "Low price",
					data: labels.map((l) => {
						return apiData.filter((m) => {
							return (
								new Date(m.t).toLocaleDateString("en-US", {
									day: "2-digit",
									month: "short",
									hour: "2-digit",
									minute: "2-digit",
								}) === l
							);
						})[0].l;
					}),
					borderColor: "red",
					backgroundColor: "red",
					yAxisID: "y",
				},
				{
					label: "Volume",
					data: labels.map((l) => {
						return apiData.filter((m) => {
							return (
								new Date(m.t).toLocaleDateString("en-US", {
									day: "2-digit",
									month: "short",
									hour: "2-digit",
									minute: "2-digit",
								}) === l
							);
						})[0].v;
					}),
					borderColor: "blue",
					backgroundColor: "blue",
					yAxisID: "y1",
				},
			],
		};
	}
	return (
		<>
			<div style={{ height: "calc(100vh - 160px)" }} className="bg-base-300">
				{apiData && <Line options={options} data={data} />}
				{!apiData && <p>No data from API!</p>}
			</div>
		</>
	);
}
