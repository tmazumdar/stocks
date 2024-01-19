import { InfoBar } from './info-bar';
import { TickerStats } from './ticker-stats';
import { TickerStat } from '../../../types'

type InfoPanelProps = {
    savedTickers: Array<string>,
    tickerStats: Array<TickerStat>,
    setTickerStats: React.Dispatch<React.SetStateAction<TickerStat[]>>
}

export function InfoPanel({savedTickers, tickerStats, setTickerStats}:InfoPanelProps) {
    return (
        <>
            <InfoBar></InfoBar>
            <TickerStats savedTickers={savedTickers} tickerStats={tickerStats} setTickerStats={setTickerStats}></TickerStats>
        </>
    )
};