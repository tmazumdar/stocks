import { SetStateAction } from "react";

type HomePanelProps = {
	ticker: string;
	setTicker: React.Dispatch<SetStateAction<string>>;
	range: string;
	setRange: React.Dispatch<SetStateAction<string>>;
	savedTickers: Array<string>;
	apiError: boolean;
	showMore: boolean;
	setShowMore: React.Dispatch<SetStateAction<boolean>>;
};

export function ChartBar({
	savedTickers,
	ticker,
	setTicker,
	range,
	setRange,
	apiError,
	showMore,
	setShowMore,
}: HomePanelProps) {
	const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (
		e
	) => {
		setTicker(e.currentTarget.value);
	};

	const handleRangeClick: React.MouseEventHandler<HTMLInputElement> = (
		e: React.MouseEvent<HTMLInputElement>
	) => {
		setRange((e.target as HTMLInputElement).value);
	};

	const handleShowMoreClick: React.MouseEventHandler<HTMLButtonElement> = (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		setShowMore(!showMore);
	};

	return (
		<div className="navbar bg-base-200 rounded-lg flex">
			<div className="px-1 flex-none">
				<label className="swap swap-rotate">
					{/* this hidden checkbox controls the state */}
					<input type="checkbox" className="theme-controller" value="dim" />
					{/* sun icon */}
					<svg
						className="swap-on fill-current w-6 h-6"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
					>
						<path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
					</svg>
					{/* moon icon */}
					<svg
						className="swap-off fill-stone-400 w-6 h-6"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
					>
						<path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
					</svg>
				</label>
			</div>
			<div className="flex-1">
				<h2>Ticker Tracker 💸 </h2>
			</div>
			<div className="flex-1 px-8">
				<select
					disabled={apiError}
					className="select select-bordered select-md w-full max-w-xs"
					onChange={(e) => handleSelectChange(e)}
					value={ticker}
				>
					<option defaultValue={""}>Select Ticker to plot..</option>
					{savedTickers &&
						savedTickers.map((t) => {
							return (
								<option key={t} value={t}>
									{t}
								</option>
							);
						})}
				</select>
			</div>

			<div className="flex-1">
				<div className="join">
					<input
						disabled={apiError}
						className="join-item btn btn-sm"
						checked={range === "D"}
						type="radio"
						name="options"
						aria-label="D"
						value={"D"}
						onClick={(e) => handleRangeClick(e)}
					/>
					<input
						disabled={apiError}
						className="join-item btn btn-sm"
						checked={range === "W"}
						type="radio"
						name="options"
						aria-label="W"
						value={"W"}
						onClick={(e) => handleRangeClick(e)}
					/>
					<input
						disabled={apiError}
						className="join-item btn btn-sm"
						checked={range === "M"}
						type="radio"
						name="options"
						aria-label="M"
						value={"M"}
						onClick={(e) => handleRangeClick(e)}
					/>
					<input
						disabled={apiError}
						className="join-item btn btn-sm"
						checked={range === "6M"}
						type="radio"
						name="options"
						aria-label="6M"
						value={"6M"}
						onClick={(e) => handleRangeClick(e)}
					/>
					<input
						disabled={apiError}
						className="join-item btn btn-sm"
						checked={range == "YTD"}
						type="radio"
						name="options"
						aria-label="YTD"
						value={"YTD"}
						onClick={(e) => handleRangeClick(e)}
					/>
					<input
						disabled={apiError}
						className="join-item btn btn-sm"
						checked={range == "Y"}
						type="radio"
						name="options"
						aria-label="Y"
						value={"Y"}
						onClick={(e) => handleRangeClick(e)}
					/>
					<input
						disabled={apiError}
						className="join-item btn btn-sm"
						checked={range == "2Y"}
						type="radio"
						name="options"
						aria-label="2Y"
						value={"2Y"}
						onClick={(e) => handleRangeClick(e)}
					/>
					<button
						disabled={!ticker || apiError}
						className="join-item btn btn-sm text-primary"
						onClick={(e) => handleShowMoreClick(e)}
					>
						{showMore ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
								/>
							</svg>
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
