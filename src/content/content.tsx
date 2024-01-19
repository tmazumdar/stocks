import { useEffect, useState } from 'react';
import { BottomNav } from './bottom-nav';
import { InfoPanel } from './panels/info/info-panel';
import { SearchPanel } from './panels/search/search-panel';
import { TickerRow, TickerStat } from '../types';


interface PromiseResponse {
    status: string;
    value: string;
}

export function Content() {
    
    const [activePanelIndex, setActivePanelIndex] = useState(0);
    const [savedTickers, setSavedTickers] = useState<Array<string>>([]);
    const [tickerRows, setTickerRows] = useState<Array<TickerRow>>([]);
    const [tickerStats, setTickerStats] = useState<TickerStat[]>([]);
    let statsArray = new Array<TickerStat>();

    useEffect(() => {
        // load prev closing data
        let date = new Date();
        let prevDate = new Date(date.setDate(date.getDate() - 1));
        let prevDateFormatted = prevDate.toISOString().split('T')[0]    // get YYYY-MM-DD for api param
        
        window.api.fetchGroupedDaily(prevDateFormatted).then((res: any) => {
            statsArray = JSON.parse(res);
            console.log(statsArray);
            setTickerStats(statsArray);
        });
    }, []);

    useEffect(() => {
        // fetch previous closing prices for all saved tickers from api
        // const promises: Promise<number>[] = savedTickers.map(t => {
        //     return window.api.fetchPrevClose(t)
        // });
        
        // Promise.allSettled(promises)
        //     .then((res: any) => {
        //         statsArray = res.map((r: PromiseResponse) => {
        //             console.log(r.value, "test");
        //             if (r.status === "fulfilled" && !!r.value) {
        //                 return JSON.parse(r.value).results?.[0];
        //             }
        //         });
        //         setTickerStats(statsArray);
        //     });
       // console.log(statsArray);
        setTickerStats(statsArray.map(s => {
            if (savedTickers.indexOf(s.T) >= 0)
                return s;
        }));
    }, [])


    const panelMap = (panelIndex: number) => {
        if (panelIndex == 0) {
            return (
                <InfoPanel tickerStats={tickerStats}></InfoPanel>
            )
        } else if (panelIndex == 1) {
            return (
                <SearchPanel 
                    savedTickers={savedTickers} 
                    tickerRows={tickerRows} 
                    setSavedTickers={setSavedTickers} 
                    setTickerRows={setTickerRows}
                ></SearchPanel>
            )
        }
    };

    return (
        <div>
            {panelMap(activePanelIndex)}
            <BottomNav activePanelIndex={activePanelIndex} setActivePanelIndex={setActivePanelIndex}></BottomNav>            
        </div>
    )
};