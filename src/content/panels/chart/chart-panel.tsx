import { ChartBar } from './chart-bar';
import { ChartInstance } from './chart-instance';

type ChartPanelProps = {
    savedTickers: Array<string>,
}
// useEffect
// window.api.fetchAggregates("AAPL", 1, "day", "2023-01-09", "2023-01-23").then((res: any) => {
//     console.log(JSON.parse(res).results);    
// });

export function ChartPanel({ savedTickers }:ChartPanelProps) {
    return (
        <>
            <ChartBar savedTickers={savedTickers}></ChartBar>
            <ChartInstance></ChartInstance>
        </>
    )
};