import { DrinksBoardPageFactoryInterface } from './drinks-board-page-factory-interface';
import { DrinksBoardPage } from './drinks-board-page';

export class DrinksBoardPageFactory implements DrinksBoardPageFactoryInterface {
    constructor (private cheerio: CheerioAPI) {}

    createDrinksBoardPage (drinksPageHTML: string) {
        return new DrinksBoardPage(this.cheerio, drinksPageHTML);
    }
}
