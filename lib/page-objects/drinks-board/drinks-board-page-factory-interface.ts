import { IDrinksBoardPage } from './drinks-board-page-interface';

export interface IDrinksBoardPageFactory {
    createDrinksBoardPage(drinksPageHTML: string): IDrinksBoardPage;
}
