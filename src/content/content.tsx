import { useState } from 'react';
import { BottomNav } from './bottom-nav';
import { SearchBar } from './search-bar';
import { TickerTable } from './ticker-table';
import { TickerRow } from '../types';

export function Content() {
    const [searchText, setSearchText] = useState("");
    const [activePanelIndex, setActivePanelIndex] = useState(0);
    const [tickerRows, setTickerRows] = useState<Array<TickerRow>>([]);
    const [savedTickers, setSavedTickers] = useState<Array<string>>([]);

    const searchClickHandler = () => {
        window.api.getTickers(searchText).then((res: any) => {
            let results: Array<TickerRow> = JSON.parse(res).results;
            setTickerRows(results);
        });
    };

    const saveTicker = (ticker: string) => {
        
        let saveData = new Array<string>();
        saveData.push(ticker);
        window.api.saveTickers(saveData).then((res: any) => {
            let results: Array<string> = JSON.parse(res).results;
            setSavedTickers(results);
            console.log(savedTickers);
        });

        // var res = window.api.saveTickers(saveData)
        // let jsonResults: Array<string> = JSON.parse(res).result;
        // setSavedTickers(jsonResults);
        // console.log(savedTickers);
    };

    return (
        <>
            
            <SearchBar searchText={searchText} setSearchText={setSearchText} onSearchClick={searchClickHandler}></SearchBar>
            <div className="divider divider-primary"></div>
        
            <TickerTable rows={tickerRows} saveTicker={saveTicker}></TickerTable>
            
            <BottomNav activePanelIndex={activePanelIndex} setActivePanelIndex={setActivePanelIndex}></BottomNav>
        </>
    )
};