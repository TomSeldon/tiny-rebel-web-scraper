import { DrinksBoardPageInterface } from './drinks-board-page-interface';

export interface DrinksBoardPageFactoryInterface {
    createDrinksBoardPage (drinksPageHTML: string): DrinksBoardPageInterface;
}
