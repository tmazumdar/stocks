import { useState } from 'react';
import { NavBar } from './navbar';
import { TickerTable } from './ticker-table';
import { TickerRow } from '../types';

export function Content() {
    const [searchText, setSearchText] = useState("");
    const [tickerRows, setTickerRows] = useState<Array<TickerRow>>([]);

    const searchClickHandler = () => {
        window.api.getTickers(searchText).then((res: any) => {
            let results: Array<TickerRow> = JSON.parse(res).results;
            setTickerRows(results);
        });
    };

    return (
        <>
            <div className="h-1/4">
                <NavBar searchText={searchText} setSearchText={setSearchText} onSearchClick={searchClickHandler}></NavBar>
                <div className="divider divider-primary"></div>
            </div>
            <div className="h-3/4">
                <TickerTable rows={tickerRows}></TickerTable>
            </div>
        </>
    )
};