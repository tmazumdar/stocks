import { useEffect, useState } from 'react';
import { BottomNav } from './bottom-nav';
import { HomePanel } from './panels/home/home-panel';
import { SearchPanel } from './panels/search/search-panel';
import { TickerRow, TickerStat } from '../types';

export function Content() {
    
    const [activePanelIndex, setActivePanelIndex] = useState(0);
    const [savedTickers, setSavedTickers] = useState<Array<string>>([]);
    const [tickerRows, setTickerRows] = useState<Array<TickerRow>>([]);
    const [tickerStats, setTickerStats] = useState<TickerStat[]>([]);
    let statsArray = new Array<TickerStat>();

    useEffect(() => {
        // load tickers from preferences file, this is needed for SearchPanel
        window.api.loadTickers().then((res: string) => {
            setSavedTickers(JSON.parse(res));
        })
    }, []);

    useEffect(() => {
        // load prev closing data
        let date = new Date();
        let prevDate = new Date(date.setDate(date.getDate() - 1));
        let prevDateFormatted = prevDate.toISOString().split('T')[0]    // get YYYY-MM-DD for api param
        
        window.api.fetchGroupedDaily(prevDateFormatted).then((res: string) => {
            statsArray = JSON.parse(res);
            setTickerStats(statsArray);
        });
    }, [savedTickers]);

    const panelMap = (panelIndex: number) => {
        if (panelIndex == 0) {
            return (
                <HomePanel tickerStats={tickerStats} setSavedTickers={setSavedTickers}></HomePanel>
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