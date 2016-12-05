import { Drink } from '../common-types';

export interface APIInterface {
    getAllDrinks (barLocation: string): Promise<Array<Drink>>;

    getAllCaskDrinks (barLocation: string): Promise<Array<Drink>>;

    getAllKegDrinks (barLocation: string): Promise<Array<Drink>>;
};
