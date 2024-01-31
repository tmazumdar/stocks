import { useState } from "react";
import { TickerStat } from "../../../types";

type TickerStatsProps = {
	tickerStats: Array<TickerStat>;
	setSavedTickers: React.Dispatch<React.SetStateAction<string[]>>;
};

export function TickerStats({
	tickerStats,
	setSavedTickers,
}: TickerStatsProps) {
	const [tickerToRemove, setTickerToRemove] = useState("");
	const handleRemove = (
		e: React.MouseEvent<HTMLButtonElement>,
		ticker: string
	) => {
		setTickerToRemove(ticker);
		(
			document.querySelector<HTMLDialogElement>(
				"#remove_ticker_confirm_modal"
			) as any
		).showModal();
	};

	const removeTicker = (ticker: string) => {
		window.api.removeTicker(ticker).then((res: string) => {
			setSavedTickers(JSON.parse(res));
			dismissDialog();
		});
	};

	const dismissDialog = () => {
		(
			document.querySelector<HTMLDialogElement>(
				"#remove_ticker_confirm_modal"
			) as any
		).close();
	};

	return (
		<div
			className="overflow-y-scroll"
			style={{ height: "calc(100vh - 160px)" }}
		>
			{tickerStats &&
				tickerStats.map((t: TickerStat) => {
					return (
						<div
							className="stats shadow flex text-xs hover:bg-base-600"
							key={t.T}
						>
							<div className="stat relative group hover:text-primary">
								<div className="stat-figure text-secondary">
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
											d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
										/>
									</svg>
								</div>
								<div className="stat-title">Ticker</div>
								<div className="stat-value">{t.T}</div>
								<div className="stat-desc">
									{new Intl.DateTimeFormat("en-US", {
										year: "numeric",
										month: "long",
										day: "2-digit",
									}).format(t.t)}
								</div>
								<div className="absolute top-0 right-0 h-6 w-5 flex">
									<button
										className="text-slate-400 hover:text-primary hidden group-hover:block"
										onClick={(e) => handleRemove(e, t.T)}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-4 h-4"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
											/>
										</svg>
									</button>
								</div>
							</div>
							<div className="stat">
								<div className="stat-figure text-secondary">
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
											d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
										/>
									</svg>
								</div>
								<div className="stat-title">Volume (units)</div>
								<div className="stat-value">
									{t.v.toLocaleString("en-US", {
										notation: "compact",
										compactDisplay: "short",
									})}
								</div>
								<div className="stat-desc">
									{t.n.toLocaleString("en-US", {
										notation: "compact",
										compactDisplay: "short",
									})}{" "}
									transactions
								</div>
							</div>

							<div className="stat">
								<div className="stat-figure text-secondary">
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
											d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
										/>
									</svg>
								</div>
								<div className="stat-title">Open ($)</div>
								<div className="stat-value">{t.o.toFixed(2)}</div>
								<div className="flex space-x-1">
									<div className="text-green-500">H↗︎ {t.h.toFixed(2)}</div>
									<div className="text-red-500  px-1">L↘︎ {t.l.toFixed(2)}</div>
								</div>
							</div>

							<div className="stat">
								<div className="stat-figure text-secondary">
									{t.cp > 0 ? (
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
												d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
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
												d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
											/>
										</svg>
									)}
								</div>
								<div className="stat-title">Close ($)</div>
								<div className="stat-value">{t.c.toFixed(2)}</div>
								<div
									className={
										t.cp > 0
											? "text-green-500 stat-desc"
											: "text-red-500 stat-desc"
									}
								>
									{t.cp > 0 ? "Gain" : "Loss"} ({Math.abs(t.cp).toFixed(1)}%)
								</div>
							</div>
						</div>
					);
				})}
			<dialog id="remove_ticker_confirm_modal" className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Are you sure?</h3>
					<p className="py-4">
						{tickerToRemove} will be removed from saved preferences.
					</p>
					<button
						className="btn btn-ghost text-primary"
						onClick={() => removeTicker(tickerToRemove)}
					>
						Yes
					</button>
					<button className="btn btn-ghost" onClick={() => dismissDialog()}>
						No
					</button>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</div>
	);
}
