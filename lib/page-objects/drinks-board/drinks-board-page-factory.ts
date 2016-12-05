import { DrinksBoardPage } from './drinks-board-page';
import { IDrinksBoardPageFactory } from './drinks-board-page-factory-interface';

export class DrinksBoardPageFactory implements IDrinksBoardPageFactory {
    constructor (private cheerio: CheerioAPI) {}

    public createDrinksBoardPage (drinksPageHTML: string) {
        return new DrinksBoardPage(this.cheerio, drinksPageHTML);
    }
}
