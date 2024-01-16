import { useEffect, useState } from 'react';
import { BottomNav } from './bottom-nav';
import { SearchBar } from './search-bar';
import { TickerTable } from './ticker-table';
import { TickerRow } from '../types';

export function Content() {
    const [searchText, setSearchText] = useState("");
    const [activePanelIndex, setActivePanelIndex] = useState(0);
    const [tickerRows, setTickerRows] = useState<Array<TickerRow>>([]);
    const [tickers, setTickers] = useState<Array<string>>([]);
    const [showSaved, setShowSaved] = useState(false);

    useEffect(() => {
        window.api.loadTickers().then((res: Array<string>) => {
            setTickers(res);
        });
    }, []);

    useEffect(() => {
        console.log(tickers);
    }, [tickers]);

    const searchClickHandler = () => {
        window.api.fetchTickers(searchText).then((res: any) => {
            let results: Array<TickerRow> = JSON.parse(res).results;
            setTickerRows(results);
        });
    };

    const toggleTicker = (ticker: string) => {
        // if ticker existed in array, unsave ticker
        // else save ticker
        let toggleSave = tickers.indexOf(ticker) === -1;
        let saveData = new Array<string>();
        
        tickers.forEach(v => {
            // this preserves other tickers, and skips toggled one
            if (v !== ticker)
                saveData.push(v);
        });
        if (toggleSave)
            saveData.push(ticker);       

        window.api.saveTickers(saveData).then(() => {
            setTickers(saveData);
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
        <div>
            <SearchBar searchText={searchText} setSearchText={setSearchText} onSearchClick={searchClickHandler}></SearchBar>
            
            <TickerTable rows={tickerRows} savedTickers={tickers} toggleTicker={toggleTicker}></TickerTable>
            {/* <div className="divider divider-primary"></div> */}
            
            <div className="collapse bg-base-300">
                <input type="checkbox" /> 
                <div className="collapse-title text-xs">
                    <p>{tickers.length} tickers saved. Click to show</p>
                </div>
                <div className="collapse-content space-x-1 space-y-1"> 
                    {tickers.map(t => {
                        return <div className="badge badge-primary badge-outline text-xs">{t}</div>
                    })}
                </div>
            </div>

            <BottomNav activePanelIndex={activePanelIndex} setActivePanelIndex={setActivePanelIndex}></BottomNav>
            {showSaved && <div className="toast toast-bottom">
                <div className="alert alert-success">
                    <span>Saved.</span>
                </div>
            </div>}
        </div>
    )
};