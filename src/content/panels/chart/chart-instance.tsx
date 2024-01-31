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
	let data;

	let options = {
		responsive: true,
		plugins: {
			legend: {
				display: apiData && apiData.length > 0,
				position: "top" as const,
			},
			datalabels: {},
			title: {
				display: !!displayTicker,
				text: `${displayTicker} Chart`,
			},
		},
	};

	if (!!apiData) {
		labels = apiData.map((m) =>
			// new Intl.DateTimeFormat("en-US", {
			// 	year: "numeric",
			// 	month: "short",
			// 	day: "2-digit",
			// 	hour: "2-digit",
			// 	minute: "2-digit",
			// }).format(m.t)
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
								// new Intl.DateTimeFormat("en-US", {
								// 	year: "numeric",
								// 	month: "short",
								// 	day: "2-digit",
								// 	hour: "2-digit",
								// 	minute: "2-digit",
								// }).format(m.t) == l
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
				},
			],
		};
	}
	return (
		<>
			<div style={{ height: "calc(100vh - 160px)" }} className="bg-base-300">
				{apiError && (
					<div role="alert" className="alert shadow-lg alert-warning">
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
					</div>
				)}
				{apiData && <Line options={options} data={data} />}
				{!apiData && <p>No data from API!</p>}
			</div>
		</>
	);
}
