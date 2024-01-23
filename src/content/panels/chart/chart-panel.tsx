import { ChartBar } from './chart-bar';
import { ChartInstance } from './chart-instance';

type ChartPanelProps = {
    savedTickers: Array<string>,
}

export function ChartPanel({ savedTickers }:ChartPanelProps) {
    return (
        <>
            <ChartBar savedTickers={savedTickers}></ChartBar>
            <ChartInstance></ChartInstance>
        </>
    )
};