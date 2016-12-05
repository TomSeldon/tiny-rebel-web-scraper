import { Drink } from '../../common-types';
import { IDrinksBoardPage } from './drinks-board-page-interface';

export class DrinksBoardPage implements IDrinksBoardPage {
    private page: CheerioStatic;

    constructor (private cheerio: CheerioAPI, private drinksPageHTML: string) {
        this.page = this.cheerio.load(this.drinksPageHTML);
    }

    public getAllDrinks (): Drink[] {
        const drinks: Drink[] = [];

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
            abv: this.getDrinkABV(rawDrink),
            available: this.isAvailable(rawDrink),
            brewery: this.getBrewery(rawDrink),
            cask: drinkType === 'cask',
            currency: 'GBP',
            formattedAbv: this.getFormattedABV(rawDrink),
            formattedPrice: this.getFormattedDrinkPrice(rawDrink),
            keg: drinkType === 'keg',
            name: this.getDrinkName(rawDrink),
            price: this.getDrinkPrice(rawDrink),
            quantity: this.getDrinkQuantity(rawDrink),
            style: this.getDrinkStyle(rawDrink),
            vegan: this.isVegan(rawDrink)
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

    private getFormattedABV(rawDrink: CheerioElement): string {
        return this.page('.beer-abv', rawDrink).text();
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

    private getDrinkABV (rawDrink: CheerioElement): number {
        return parseFloat(this.page('.beer-abv', rawDrink).text().replace('%', ''));
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

    /**
     * TODO: Implement the check for whether the drink is available
     *
     * The vast majority of the time, the drinks listed on the beer board are all available.
     *
     * This makes finding an example of when a drink is unavailable quite difficult.
     */
    private isAvailable (rawDrink: CheerioElement): boolean {
        return true;
    }
}
