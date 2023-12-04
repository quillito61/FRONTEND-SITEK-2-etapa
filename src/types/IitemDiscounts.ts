export interface IitemDiscounts {
    ok:             boolean;
    msg:            string;
    itemsDiscounts: ItemsDiscount[];
}

export interface ItemsDiscount {
    gtin:      string;
    ruleType:  string;
    ruleCode:  string;
    value:     string;
    startDate: Date;
    endDate:   Date;
    secuency:  string;
    type:      string;
}