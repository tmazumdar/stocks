import { InfoBar } from './info-bar';
import { TickerStats } from './ticker-stats';
import { TickerStat } from '../../../types'

type InfoPanelProps = {
    tickerStats: Array<TickerStat>
}

export function InfoPanel({ tickerStats }:InfoPanelProps) {
    return (
        <>
            <InfoBar></InfoBar>
            <TickerStats tickerStats={tickerStats}></TickerStats>
        </>
    )
};