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
    t: number;  // timestamp
    n: number;  // # of transactions
    cp: number; // change percent
}

export interface AggregatePoint {
    c: number;  // close
    h: number;  // high
    l: number;  // low
    n: number;  // # of transactions
    o: number;  // open
    t: number;  // timestamp
    v: number;  // volume
    vw: number; // volume weighted avg price
}