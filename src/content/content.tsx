import { useState } from 'react';
import { BottomNav } from './bottom-nav';
import { SearchBar } from './search-bar';
import { TickerTable } from './ticker-table';
import { TickerRow } from '../types';

export function Content() {
    const [searchText, setSearchText] = useState("");
    const [activePanel, setActivePanel] = useState(true);
    const [tickerRows, setTickerRows] = useState<Array<TickerRow>>([]);

    const searchClickHandler = () => {
        window.api.getTickers(searchText).then((res: any) => {
            let results: Array<TickerRow> = JSON.parse(res).results;
            setTickerRows(results);
        });
    };

    return (
        <>
            
            <SearchBar searchText={searchText} setSearchText={setSearchText} onSearchClick={searchClickHandler}></SearchBar>
            <div className="divider divider-primary"></div>
        
            <TickerTable rows={tickerRows}></TickerTable>
            
            <BottomNav></BottomNav>
        </>
    )
};