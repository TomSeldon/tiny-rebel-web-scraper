import * as request from 'request';

import { APIInterface } from './api-interface';
import { barLocations } from '../bars';
import { Drink } from '../common-types';
import { DrinksBoardPageFactoryInterface } from '../page-objects/drinks-board';

export class API implements APIInterface {

    constructor (
        private drinksBoardPageFactory: DrinksBoardPageFactoryInterface,
        private request: request.RequestAPI<request.Request, request.RequestCallback, request.RequiredUriUrl>
    ) {}

    getAllDrinks (barLocation: string): Promise<Array<Drink>> {
        return new Promise(resolve => {
            if (!barLocation) {
                throw new Error('No bar location specified');
            }

            if (!this.isValidBarLocation(barLocation)) {
                throw new Error('Unknown bar location specified');
            }

            const url = `http://www.tinyrebel.co.uk/bars/${barLocation}/beer-board/`;

            this.request.get(url, (error, response, body) => {
                if (error || response && response.statusCode !== 200) {
                    throw new Error('Unable to load beer board');
                }

                const drinksBoardPage = this.drinksBoardPageFactory.createDrinksBoardPage(body);

                resolve(drinksBoardPage.getAllDrinks());
            });
        });
    }

    getAllCaskDrinks (barLocation: string) {
        return this.getAllDrinks(barLocation)
            .then((drinks: Array<Drink>) => drinks.filter((drink: Drink) => drink.cask === true));
    }

    getAllKegDrinks (barLocation: string) {
        return this.getAllDrinks(barLocation)
            .then((drinks: Array<Drink>) => drinks.filter((drink: Drink) => drink.keg === true));

    }

    private isValidBarLocation (barLocation: string): boolean {
        return barLocations.indexOf(barLocation) !== -1;
    }
};
