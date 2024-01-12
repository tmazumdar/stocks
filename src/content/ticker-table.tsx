import { TickerRow } from "../types";

type TickerTableProps = {
    rows: Array<TickerRow>
}

export function TickerTable({rows}:TickerTableProps) {
    return (
        <div className="overflow-x-auto h-fit">
            <table className="table table-fixed table-xs table-pin-rows  table-pin-cols">
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Name</th>
                        <th>Currency</th>
                        <th>Market</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(r => {
                        return (
                            <tr>
                                <th>{r.ticker}</th>
                                <td>{r.name}</td>
                                <td>{r.currency_name?.toUpperCase()}</td>
                                <td>{r.market}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
};