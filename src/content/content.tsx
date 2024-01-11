import { useState } from 'react';
import { NavBar } from './navbar';
import { ResultsTable } from './results-table';
import { net } from 'electron';

export function Content() {
    
    const [searchText, setSearchText] = useState("");
    const searchClickHandler = () => {
        console.log(`search clicked: ${searchText}`);
    }

    return (
        <>
            <NavBar searchText={searchText} setSearchText={setSearchText} onSearchClick={searchClickHandler}></NavBar>
            <div className="divider divider-primary"></div>
            <ResultsTable></ResultsTable>
        </>
    )
};