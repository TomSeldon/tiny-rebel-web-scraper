export type Quantity = 'pint'|'half'|'third'|'two-thirds';

export type Drink = {
    name: string;
    brewery: string;
    style: string;
    available: boolean;
    price: number|null;
    formattedPrice: string;
    quantity: Quantity;
    currency: string;
    abv: number;
    formattedAbv: string;
    vegan: boolean;
    keg: boolean;
    cask: boolean;
};
