import { Drink } from '../common-types';

export interface IAPI {
    getAllDrinks (barLocation: string): Promise<Drink[]>;

    getAllCaskDrinks (barLocation: string): Promise<Drink[]>;

    getAllKegDrinks (barLocation: string): Promise<Drink[]>;
};
