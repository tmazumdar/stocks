type SavedTickersProps = {
    tickers: Array<string>
}

export function SavedTickers({tickers} : SavedTickersProps) {
    return (
        <div className="collapse bg-base-300">
            <input type="checkbox" /> 
            <div className="collapse-title text-xs">
                <p>{tickers.length} tickers saved. Click to show</p>
            </div>
            <div className="collapse-content space-x-1 space-y-1"> 
                {tickers.map(t => {
                    return <div className="badge badge-primary badge-outline text-xs">{t}</div>
                })}
            </div>
        </div>
    )
}