export type Drink = {
    name: string;
    brewery: string;
    style: string;
    available: boolean;
    price: number;
    formattedPrice: string;
    quantity: 'pint'|'half';
    currency: string;
    abv: string;
    vegan: boolean;
    keg: boolean;
    cask: boolean;
};
