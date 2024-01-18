import { useState } from 'react';
import { BottomNav } from './bottom-nav';
import { InfoPanel } from './panels/info/info-panel';
import { SearchPanel } from './panels/search/search-panel';
import { TickerRow } from '../types';

export function Content() {
    
    const [activePanelIndex, setActivePanelIndex] = useState(0);
    const [savedTickers, setSavedTickers] = useState<Array<string>>([]);
    const [tickerRows, setTickerRows] = useState<Array<TickerRow>>([]);

    const panelMap = (panelIndex: number) => {
        if (panelIndex == 0) {
            return (
                <SearchPanel 
                    savedTickers={savedTickers} 
                    tickerRows={tickerRows} 
                    setSavedTickers={setSavedTickers} 
                    setTickerRows={setTickerRows}
                ></SearchPanel>
            )
        } else if (panelIndex == 1) {
            return (
                <InfoPanel savedTickers={savedTickers}></InfoPanel>
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