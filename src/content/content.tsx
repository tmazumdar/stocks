import { NavBar } from './navbar';
import { ResultsTable } from './results-table';

export function Content() {
    return (
        <>
            <NavBar></NavBar>
            <div className="divider divider-primary"></div>
            <ResultsTable></ResultsTable>
        </>
    )
};