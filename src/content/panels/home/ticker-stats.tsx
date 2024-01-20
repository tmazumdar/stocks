import { useState } from 'react';
import { TickerStat } from '../../../types';

type TickerStatsProps = {
    tickerStats: Array<TickerStat>,
    setSavedTickers: React.Dispatch<React.SetStateAction<string[]>>
}

export function TickerStats({ tickerStats, setSavedTickers }: TickerStatsProps) {
    const [tickerToRemove,setTickerToRemove] = useState("");
    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>, ticker: string) => {
        setTickerToRemove(ticker);
        (document.querySelector<HTMLDialogElement>("#remove_ticker_confirm_modal") as any).showModal();
    };

    const removeTicker = (ticker: string) => {
        window.api.removeTicker(ticker).then((res: string) => {
            setSavedTickers(JSON.parse(res));
            dismissDialog();
        });
    };

    const dismissDialog = () => {
        (document.querySelector<HTMLDialogElement>("#remove_ticker_confirm_modal") as any).close();
    };

    return (
        <div className="overflow-y-scroll" style={{height: 'calc(100vh - 160px)'}}>
            {tickerStats && tickerStats.map((t: TickerStat) => {
                return (
                    <div className="stats shadow flex text-xs hover:bg-base-600" key={t.T}>
                        <div className="stat relative group hover:text-primary">                
                            <div className="stat-title">Ticker</div>
                            <div className="stat-value">{t.T}</div>
                            <div className="stat-desc">{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).format(t.t)}</div>
                            <div className="absolute top-0 right-0 h-6 w-5 flex">
                                <button className="text-slate-400 hover:text-primary hidden group-hover:block" onClick={(e) => handleRemove(e, t.T)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="stat">
                            <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div className="stat-title">Volume</div>
                            <div className="stat-value">{t.v.toLocaleString('en-US', {notation: 'compact', compactDisplay: 'short'})}</div>
                        </div>
            
                        <div className="stat">
                            <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                            </div>
                            <div className="stat-title">Open</div>
                            <div className="stat-value">{t.o.toFixed(2)}</div>
                            <div className="stat-desc text-green-600">H↗︎ {t.h.toFixed(2)} (22%)</div>
                        </div>
            
                        <div className="stat">
                            <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                            </div>
                            <div className="stat-title">Close</div>
                            <div className="stat-value">{t.c.toFixed(2)}</div>
                            <div className="stat-desc text-red-700">L↘︎ {t.l.toFixed(2)} (14%)</div>
                        </div>
            
                    </div>
                )
            })}
            <dialog id="remove_ticker_confirm_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure?</h3>
                    <p className="py-4">{tickerToRemove} will be removed from saved preferences.</p>
                    <button className="btn btn-ghost text-primary" onClick={() => removeTicker(tickerToRemove)}>Yes</button>
                    <button className="btn btn-ghost" onClick={() => dismissDialog()}>No</button>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>        
    )
}