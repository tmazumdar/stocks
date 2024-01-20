import { TickerRow } from "../../../types";

type TickerTableProps = {
    rows: Array<TickerRow>,
    savedTickers: Array<string>,
    toggleTicker: (ticker: string) => void
}

export function TickerTable({rows, savedTickers, toggleTicker}:TickerTableProps) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, ticker: string) => {
        toggleTicker(ticker);
    };

    return (
        <div className="overflow-y-auto" style={{height: 'calc(100vh - 160px)'}}>  
            <table className="table table-fixed table-xs table-pin-rows">
                <thead>
                    <tr>
                        <th></th>
                        <th>Ticker</th>
                        <th>Name</th>
                        <th>Currency</th>
                        <th>Market</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(r => {
                        return (
                            <tr className="hover" key={r.ticker}>
                                <td>
                                    <div className="tooltip tooltip-right" data-tip={savedTickers.indexOf(r.ticker) >= 0 ? 'Unsave' : 'Save'}>
                                        <button className="text-primary" onClick={(e) => handleClick(e, r.ticker)}>
                                            {savedTickers.indexOf(r.ticker) >= 0 ? 
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M8 2a3 3 0 0 0-3 3v16a1 1 0 0 0 1.447.894L12 19.118l5.553 2.776A1 1 0 0 0 19 21V5a3 3 0 0 0-3-3z" clipRule="evenodd"/></svg>
                                                : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 3H8a2 2 0 0 0-2 2v16l6-3l6 3V5a2 2 0 0 0-2-2"/></svg>
                                            }                                        
                                        </button>
                                    </div>
                                    {/* selected icon */}
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M8 2a3 3 0 0 0-3 3v16a1 1 0 0 0 1.447.894L12 19.118l5.553 2.776A1 1 0 0 0 19 21V5a3 3 0 0 0-3-3z" clip-rule="evenodd"/></svg> */}
                                </td>
                                <td>{r.ticker}</td>
                                <td>{r.name}</td>
                                <td>{r.currency_name?.toUpperCase()}</td>
                                <td>{r.market}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            
        </div>
    )
};