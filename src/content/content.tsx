import { useState } from 'react';
import { NavBar } from './navbar';
import { ResultsTable } from './results-table';

export function Content() {
    const [searchText, setSearchText] = useState("");
    const searchClickHandler = () => {
        console.log(`search clicked: ${searchText}`);
        window.api.getTickers(searchText).then((res: any) => {
            console.log(JSON.parse(res).results);
        });
    };

    return (
        <>
            <NavBar searchText={searchText} setSearchText={setSearchText} onSearchClick={searchClickHandler}></NavBar>
            <div className="divider divider-primary"></div>
            <ResultsTable></ResultsTable>
        </>
    )
};