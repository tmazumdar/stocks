import { useEffect, useState } from 'react';
import { BottomNav } from './bottom-nav';
import { HomePanel } from './panels/home/home-panel';
import { SearchPanel } from './panels/search/search-panel';
import { TickerRow, TickerStat } from '../types';
import { ChartPanel } from './panels/chart/chart-panel';

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
        let prevBusinessDate = getPreviousBusinessDayDate();
        let prevBusinessDateFormatted = prevBusinessDate.toISOString().split('T')[0]    // get YYYY-MM-DD for api param

        window.api.fetchGroupedDaily(prevBusinessDateFormatted).then((res: string) => {
            statsArray = JSON.parse(res);
            // populate percent high/low
            statsArray.forEach((s: TickerStat) => {
                s.cp = ((s.c - s.o) / s.o)*100;                
            })
            setTickerStats(statsArray);
        });
    }, [savedTickers]);

    const getPreviousBusinessDayDate = () => {
        let date = new Date();

        let dayOfWeek = date.getDay();
        switch (dayOfWeek) {
            case 1:     // monday: get last friday's date
                return new Date(date.setDate(date.getDate() - 3));
            case 0:     // sunday: get last friday's date
                return new Date(date.setDate(date.getDate() - 2));
            default:    // any other day: get previous day's date
                return new Date(date.setDate(date.getDate() - 1));
        }
    }

    const getActivePanel = (panelIndex: number) => {
        if (panelIndex === 0) {
            return (
                <HomePanel tickerStats={tickerStats} setSavedTickers={setSavedTickers}></HomePanel>
            )
        } else if (panelIndex === 1) {
            return (
                <SearchPanel 
                    savedTickers={savedTickers} 
                    tickerRows={tickerRows} 
                    setSavedTickers={setSavedTickers} 
                    setTickerRows={setTickerRows}
                ></SearchPanel>
            )
        } else if (panelIndex === 2) {
            return (
                <ChartPanel savedTickers={savedTickers}></ChartPanel>
            )
        }
    };

    return (
        <div>
            {getActivePanel(activePanelIndex)}
            <BottomNav activePanelIndex={activePanelIndex} setActivePanelIndex={setActivePanelIndex}></BottomNav>            
        </div>
    )
};