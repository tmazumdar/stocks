import { HomeBar } from './home-bar';
import { TickerStats } from './ticker-stats';
import { TickerStat } from '../../../types'

type HomePanelProps = {
    tickerStats: Array<TickerStat>,
    setSavedTickers: React.Dispatch<React.SetStateAction<string[]>>
}

export function HomePanel({ tickerStats, setSavedTickers }:HomePanelProps) {
    return (
        <>
            <HomeBar></HomeBar>
            {tickerStats.length == 0 ? 
            <div role="alert" className="alert alert-info rounded shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <span>No tickers saved! Bookmark tickers from the search tab to show stats here.</span>
            </div> 
            :
            <TickerStats tickerStats={tickerStats} setSavedTickers={setSavedTickers}></TickerStats>
            }
        </>
    )
};