import { useEffect, useState } from 'react';
import { TickerStat } from '../../../types';

type TickerStatsProps = {
    savedTickers: Array<string>,
    tickerStats: Array<TickerStat>,
    setTickerStats: React.Dispatch<React.SetStateAction<TickerStat[]>>
}

interface PromiseResponse {
    status: string;
    value: string;
}

export function TickerStats({ savedTickers, tickerStats, setTickerStats }: TickerStatsProps) {
    

    useEffect(() => {
        // fetch previous closing prices for all saved tickers from api
        const promises: Promise<number>[] = savedTickers.map(t => {
            return window.api.fetchPrevClose(t)
        });

        Promise.allSettled(promises)
            .then((res: any) => {
                setTickerStats(res.map((r: PromiseResponse) => {
                    if (r.status === "fulfilled" && !!r.value) {
                        return JSON.parse(r.value).results[0];
                    }
                }));
            })
    }, []);

    useEffect(() => {
        console.log(tickerStats);
    }, [tickerStats]);

    return (
        <div className="h-96 overflow-y-scroll">
            {tickerStats && tickerStats.map((t: TickerStat) => {
                return (
                    <div className="stats shadow flex text-xs">
                        <div className="stat">                
                            <div className="stat-title">Ticker</div>
                            <div className="stat-value">{t.T}</div>
                            <div className="stat-desc">Jan 1st - Feb 1st</div>
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
                            <div className="stat-value">{t.o}</div>
                            <div className="stat-desc text-green-600">H↗︎ {t.h} (22%)</div>
                        </div>
            
                        <div className="stat">
                            <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                            </div>
                            <div className="stat-title">Close</div>
                            <div className="stat-value">{t.c}</div>
                            <div className="stat-desc text-red-700">L↘︎ {t.l} (14%)</div>
                        </div>
            
                    </div>
                )
            })}
        </div>        
    )
}