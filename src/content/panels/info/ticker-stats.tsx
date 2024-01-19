import { TickerStat } from '../../../types';

type TickerStatsProps = {
    tickerStats: Array<TickerStat>
}

export function TickerStats({ tickerStats }: TickerStatsProps) {

    return (
        <div className="h-96 overflow-y-scroll">
            {tickerStats && tickerStats.map((t: TickerStat) => {
                return (
                    <div className="stats shadow flex text-xs" key={t.T}>
                        <div className="stat">                
                            <div className="stat-title">Ticker</div>
                            <div className="stat-value">{t.T}</div>
                            <div className="stat-desc">{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).format(t.t)}</div>
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
        </div>        
    )
}