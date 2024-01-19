export interface TickerRow {
    ticker: string
    name: string
    market: string
    locale: string
    primary_exchange: string
    type: string
    active: boolean
    currency_name: string
    cik?: string
    composite_figi: string
    share_class_figi: string
    last_updated_utc: string
}

export interface TickerStat {
    T: string;  // ticker
    v: number;  // volume
    o: number;  // open
    h: number;  // high
    l: number;  // low
    c: number;  // close
}