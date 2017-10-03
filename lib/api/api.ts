import * as request from 'request';

import { barLocations } from '../bars';
import { Drink } from '../common-types';
import { IDrinksBoardPageFactory } from '../page-objects/drinks-board';
import { IAPI } from './api-interface';

export class API implements IAPI {

    constructor (
        private drinksBoardPageFactory: IDrinksBoardPageFactory,
        private request: request.RequestAPI<request.Request, request.CoreOptions, request.RequiredUriUrl>
    ) {}

    public getAllDrinks (barLocation: string): Promise<Drink[]> {
        return new Promise((resolve) => {
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

    public getAllCaskDrinks (barLocation: string) {
        return this.getAllDrinks(barLocation)
            .then((drinks: Drink[]) => drinks.filter((drink: Drink) => drink.cask === true));
    }

    public getAllKegDrinks (barLocation: string) {
        return this.getAllDrinks(barLocation)
            .then((drinks: Drink[]) => drinks.filter((drink: Drink) => drink.keg === true));

    }

    private isValidBarLocation (barLocation: string): boolean {
        return barLocations.indexOf(barLocation) !== -1;
    }
};
