import { DrinksBoardPageInterface } from './drinks-board-page-interface';
import { Drink } from '../../common-types';

export class DrinksBoardPage implements DrinksBoardPageInterface {
    private page: CheerioStatic;

    constructor (private cheerio: CheerioAPI, private drinksPageHTML: string) {
        this.page = this.cheerio.load(this.drinksPageHTML);
    }

    getAllDrinks (): Array<Drink> {
        return this.parseDrinksFromPage();
    }

    private parseDrinksFromPage (): Array<Drink> {
        const drinks: Array<Drink> = [];

        const rawKegDrinks = this.page('.beer-slider li:nth-child(1) .beer-item');
        const rawCaskDrinks = this.page('.beer-slider li:nth-child(2) .beer-item');

        rawKegDrinks.each((index: number, rawDrink: CheerioElement) => {
            drinks.push(this.parseDrinkFromPage(rawDrink, 'keg'));
        });

        rawCaskDrinks.each((index: number, rawDrink: CheerioElement) => {
            drinks.push(this.parseDrinkFromPage(rawDrink, 'cask'));
        });

        return drinks;
    }

    private parseDrinkFromPage (rawDrink: CheerioElement, drinkType: string): Drink {
        return {
            name: this.getDrinkName(rawDrink),
            price: this.getDrinkPrice(rawDrink),
            formattedPrice: this.getFormattedDrinkPrice(rawDrink),
            currency: 'GBP',
            brewery: this.getBrewery(rawDrink),
            style: this.getDrinkStyle(rawDrink),
            abv: this.getDrinkABV(rawDrink),
            vegan: this.isVegan(rawDrink),
            quantity: this.getDrinkQuantity(rawDrink),
            available: this.isAvailable(rawDrink), // todo: implement this
            keg: drinkType === 'keg',
            cask: drinkType === 'cask'
        };
    }

    private getDrinkPrice (rawDrink: CheerioElement): number {
        const pricingElement = this.page('.beer-price', rawDrink).text();
        const price = pricingElement.match(/£(\d+\.\d+)/);

        return parseFloat(price[1]);
    }

    private getFormattedDrinkPrice (rawDrink: CheerioElement): string {
        const pricingElement = this.page('.beer-price', rawDrink).text();
        const price = pricingElement.match(/(£\d+\.\d+)/);

        return price[1];
    }

    private getDrinkName (rawDrink: CheerioElement): string {
         return this.page('.beer-name', rawDrink).text().trim();
    }

    private getBrewery (rawDrink: CheerioElement): string {
        return this.page('.beer-brewery', rawDrink).text();
    }

    private getDrinkStyle (rawDrink: CheerioElement): string {
        return this.page('.beer-style', rawDrink).text();
    }

    private getDrinkABV (rawDrink: CheerioElement): string {
        return this.page('.beer-abv', rawDrink).text();
    }

    private getDrinkQuantity (rawDrink: CheerioElement): ('pint'|'half') {
        // The quantity that the drink is sold in is contained in the same element as the price
        const pricingText = this.page('.beer-price', rawDrink).text();

        if (pricingText.indexOf('½') !== -1) {
            return 'half';
        }

        return 'pint';
    }

    private isVegan (rawDrink: CheerioElement): boolean {
        return this.page('.beer-name .vegan', rawDrink).length === 1;
    }

    private isAvailable (rawDrink: CheerioElement): boolean {
        return true;
    }
}