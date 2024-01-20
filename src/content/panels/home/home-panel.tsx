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
            <TickerStats tickerStats={tickerStats} setSavedTickers={setSavedTickers}></TickerStats>
        </>
    )
};