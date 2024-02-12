type bottomNavProps = {
	activePanelIndex: number;
	setActivePanelIndex: React.Dispatch<React.SetStateAction<number>>;
};

export function BottomNav({
	activePanelIndex,
	setActivePanelIndex,
}: bottomNavProps) {
	return (
		<div className="btm-nav">
			<button
				role="button"
				onClick={() => setActivePanelIndex(0)}
				className={
					activePanelIndex === 0 ? "active text-primary" : "text-primary"
				}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					/>
				</svg>
			</button>
			<button
				role="button"
				onClick={() => setActivePanelIndex(1)}
				className={
					activePanelIndex === 1 ? "active text-primary" : "text-primary"
				}
			>
				{/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> */}
				<svg
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					viewBox="0 0 24 24"
					className="w-6 h-6"
				>
					<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
				</svg>
			</button>
			<button
				role="button"
				onClick={() => setActivePanelIndex(2)}
				className={
					activePanelIndex === 2 ? "active text-primary" : "text-primary"
				}
			>
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
						d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
					/>
				</svg>
			</button>
		</div>
	);
}
