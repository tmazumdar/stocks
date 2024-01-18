import { useState } from 'react';
import { BottomNav } from './bottom-nav';
import { SearchPanel } from './panels/search/search-panel';

export function Content() {
    
    const [activePanelIndex, setActivePanelIndex] = useState(0);

    const panelMap = (panelIndex: number) => {
        if (panelIndex == 0) {
            return <SearchPanel></SearchPanel>
        }
    };

    return (
        <div>
            {panelMap(activePanelIndex)}
            <BottomNav activePanelIndex={activePanelIndex} setActivePanelIndex={setActivePanelIndex}></BottomNav>            
        </div>
    )
};