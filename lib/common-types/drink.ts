export type Drink = {
    name: string;
    brewery: string;
    style: string;
    available: boolean;
    price: number|null;
    formattedPrice: string;
    quantity: 'pint'|'half';
    currency: string;
    abv: number;
    formattedAbv: string;
    vegan: boolean;
    keg: boolean;
    cask: boolean;
};
