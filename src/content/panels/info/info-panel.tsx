import { InfoBar } from './info-bar';
import { TickerStats } from './ticker-stats';

type InfoPanelProps = {
    savedTickers: Array<string>
}

export function InfoPanel({savedTickers}:InfoPanelProps) {
    return (
        <>
            <InfoBar></InfoBar>
            <TickerStats savedTickers={savedTickers}></TickerStats>
        </>
    )
};