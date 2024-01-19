import { useEffect, useState } from 'react';
import { SearchBar } from './search-bar';
import { TickerTable } from './ticker-table';
import { TickerRow } from '../../../types';

type SearchPanelProps = {
    savedTickers: Array<string>,
    tickerRows: Array<TickerRow>,
    setSavedTickers: React.Dispatch<React.SetStateAction<string[]>>,    
    setTickerRows: React.Dispatch<React.SetStateAction<TickerRow[]>>
}

export function SearchPanel({ savedTickers, setSavedTickers, tickerRows, setTickerRows }: SearchPanelProps) {
    const [searchText, setSearchText] = useState("");
    const [showSaved, setShowSaved] = useState(false);

    useEffect(() => {
        // load tickers from appData file
        // window.api.loadTickers().then((res: Array<string>) => {
        //     setSavedTickers(res);
        // });
    }, []);

    useEffect(() => {
        // console.log(savedTickers);
    }, [savedTickers]);

    const searchClickHandler = () => {
        // search from api
        window.api.fetchTickers(searchText).then((res: any) => {
            let results: Array<TickerRow> = JSON.parse(res).results;
            setTickerRows(results);
        });
    };

    const toggleTicker = (ticker: string) => {
        // if ticker existed in array, unsave ticker
        // else save ticker
        let toggleSave = savedTickers.indexOf(ticker) === -1;
        let saveData = new Array<string>();
        
        savedTickers.forEach(v => {
            // this preserves other tickers, and skips toggled one
            if (v !== ticker)
                saveData.push(v);
        });
        if (toggleSave)
            saveData.push(ticker);       

        window.api.saveTickers(saveData).then(() => {
            setSavedTickers(saveData);
            displayToast();
        });
    };

    const displayToast = () => {
        setShowSaved(true);
        setTimeout(() => {
            setShowSaved(false);
        }, 1800);
    };

    return (
        <>
            <SearchBar searchText={searchText} setSearchText={setSearchText} onSearchClick={searchClickHandler}></SearchBar>  
            <TickerTable rows={tickerRows} savedTickers={savedTickers} toggleTicker={toggleTicker}></TickerTable>
            {showSaved && <div className="toast toast-bottom">
                <div className="alert alert-success">
                    <span>Saved.</span>
                </div>
            </div>}
        </>
    )
};