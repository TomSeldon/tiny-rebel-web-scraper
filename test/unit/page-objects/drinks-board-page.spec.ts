import * as chai from 'chai';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

import { Drink } from '../../../lib/common-types';
import { DrinksBoardPageFactory, IDrinksBoardPage } from '../../../lib/page-objects/drinks-board';

const expect = chai.expect;

describe('drinks board page', () => {
    let pageFixture: string;
    let drinksBoardPageFactory: DrinksBoardPageFactory;

    beforeEach(() => {
        drinksBoardPageFactory = new DrinksBoardPageFactory(cheerio);
    });

    describe('when parsing a page with one keg, and one cask drink', () => {
        let drinks: Drink[];
        let drinksBoardPage: IDrinksBoardPage;

        beforeEach(() => {
            pageFixture = fs.readFileSync(
              path.join(__dirname, '../../../../../test/fixtures/one-keg-one-cask-drink.html')
            ).toString();

            drinksBoardPage = drinksBoardPageFactory.createDrinksBoardPage(pageFixture);

            drinks = drinksBoardPage.getAllDrinks();
        });

        it('should be able to parse the correct number of drinks from the page', () => {
            expect(drinks.length).to.equal(2);
        });

        it('should identify that there is a single keg drink', () => {
            const kegDrinks = drinks.filter((drink) => drink.keg === true);

            expect(kegDrinks.length).to.equal(1);
        });

        it('should identify that there is a single cask drink', () => {
            const caskDrinks = drinks.filter((drink) => drink.cask === true);

            expect(caskDrinks.length).to.equal(1);
        });

        describe('the keg drink', () => {
            let drink: Drink;

            beforeEach(() => {
                const kegDrinks = drinks.filter((item) => item.keg === true);

                drink = kegDrinks[0];
            });

            it('should correctly have identified the keg drink', () => {
                expect(drink).not.to.be.undefined;
            });

            it('should correctly parse the name of the drink', () => {
                expect(drink.name).to.equal('Urban Pils');
            });

            it('should correctly parse the price of the drink', () => {
                expect(drink.price).to.equal(3.70);
            });

            it('should include the formatted price of the drink', () => {
                expect(drink.formattedPrice).to.equal('£3.70');
            });

            it('should include the currency that the price refers to', () => {
                expect(drink.currency).to.equal('GBP');
            });

            it('should correctly parse the brewery that makes the drink', () => {
                expect(drink.brewery).to.equal('Tiny Rebel Brewing Co. (Newport, South Wales)');
            });

            it('should correctly parse the style of the drink', () => {
                expect(drink.style).to.equal('Pilsner');
            });

            it('should correctly parse that the drink is available', () => {
                expect(drink.available).to.be.true;
            });

            it('should correctly parse the ABV level of the drink', () => {
                expect(drink.abv).to.equal(4.2);
            });

            it('should correctly parse the formatted ABV level of the drink', () => {
                expect(drink.formattedAbv).to.equal('4.2%');
            });

            it('should correctly parse that the drink is sold in pints', () => {
                expect(drink.quantity).to.equal('pint');
            });

            it('should correctly parse that the drink is not suitable for vegans', () => {
                expect(drink.vegan).to.be.false;
            });

            it('should mark the drink as being a keg drink', () => {
                expect(drink.keg).to.be.true;
            });

            it('should not mark the drink as being a cask drink', () => {
                expect(drink.cask).to.be.false;
            });
        });

        describe('the cask drink', () => {
            let drink: Drink;

            beforeEach(() => {
                const caskDrinks = drinks.filter((item) => item.cask === true);

                drink = caskDrinks[0];
            });

            it('should correctly have identified the cask drink', () => {
                expect(drink).not.to.be.undefined;
            });

            it('should correctly parse the name of the drink', () => {
                expect(drink.name).to.equal('Rocksteady');
            });

            it('should correctly parse the price of the drink', () => {
                expect(drink.price).to.equal(3.90);
            });

            it('should include the formatted price of the drink', () => {
                expect(drink.formattedPrice).to.equal('£3.90');
            });

            it('should include the currency that the price refers to', () => {
                expect(drink.currency).to.equal('GBP');
            });

            it('should correctly parse the brewery that makes the drink', () => {
                expect(drink.brewery).to.equal('Tiny Rebel Brewing Co. (Newport, South Wales)');
            });

            it('should correctly parse the style of the drink', () => {
                expect(drink.style).to.equal('Cider');
            });

            it('should correctly parse that the drink is available', () => {
                expect(drink.available).to.be.true;
            });

            it('should correctly parse the ABV level of the drink', () => {
                expect(drink.abv).to.equal(5.5);
            });

            it('should correctly parse the formatted ABV level of the drink', () => {
                expect(drink.formattedAbv).to.equal('5.5%');
            });

            it('should correctly parse that the drink is sold in pints', () => {
                expect(drink.quantity).to.equal('pint');
            });

            it('should correctly parse that the drink is not suitable for vegans', () => {
                expect(drink.vegan).to.be.false;
            });

            it('should mark the drink as being a keg drink', () => {
                expect(drink.keg).to.be.false;
            });

            it('should not mark the drink as being a cask drink', () => {
                expect(drink.cask).to.be.true;
            });
        });
    });

    describe('when parsing a page with a large number of drinks', () => {
        let drinksBoardPage: IDrinksBoardPage;

        beforeEach(() => {
            pageFixture = fs.readFileSync(
              path.join(__dirname, '../../../../../test/fixtures/cardiff-02-12-2016.html')
            ).toString();

            drinksBoardPage = drinksBoardPageFactory.createDrinksBoardPage(pageFixture);
        });

        it('should be able to parse the correct number of drinks from the page', () => {
            const drinks = drinksBoardPage.getAllDrinks();

            expect(drinks.length).to.equal(26);
        });
    });

    describe('when parsing a page with a vegan drink', () => {
        let drinksBoardPage: IDrinksBoardPage;
        let drink: Drink;

        beforeEach(() => {
            pageFixture = fs.readFileSync(
              path.join(__dirname, '../../../../../test/fixtures/vegan-drink.html')
            ).toString();

            drinksBoardPage = drinksBoardPageFactory.createDrinksBoardPage(pageFixture);

            drink = drinksBoardPage.getAllDrinks()[0];
        });

        it('should correctly identify that the drink it suitable for vegans', () => {
            expect(drink.vegan).to.be.true;
        });

        it('should correctly identify the name of the drink', () => {
            expect(drink.name).to.equal('Dirty Stop Out');
        });
    });

    describe('when parsing a page with a drink sold in half-pints', () => {
        let drinksBoardPage: IDrinksBoardPage;
        let drink: Drink;

        beforeEach(() => {
            pageFixture = fs.readFileSync(
              path.join(__dirname, '../../../../../test/fixtures/half-pint.html')
            ).toString();

            drinksBoardPage = drinksBoardPageFactory.createDrinksBoardPage(pageFixture);

            drink = drinksBoardPage.getAllDrinks()[0];
        });

        it('should correctly identify the quantity of drink', () => {
            expect(drink.quantity).to.equal('half');
        });

        it('should correctly identify the price of the drink', () => {
            expect(drink.price).to.equal(3.45);
        });

        it('should include the formatted price of the drink', () => {
            expect(drink.formattedPrice).to.equal('£3.45');
        });
    });

    describe('when parsing a page with a drink that has no pricing information', () => {
        let drinksBoardPage: IDrinksBoardPage;
        let drink: Drink;

        beforeEach(() => {
            pageFixture = fs.readFileSync(
              path.join(__dirname, '../../../../../test/fixtures/ask-for-price.html')
            ).toString();

            drinksBoardPage = drinksBoardPageFactory.createDrinksBoardPage(pageFixture);

            drink = drinksBoardPage.getAllDrinks()[0];
        });

        it('should report the price as being null', () => {
            expect(drink.price).to.equal(null);
        });

        it('should output the formatted price as being "Unknown"', () => {
            expect(drink.formattedPrice).to.equal('Unknown');
        });
    });

    describe('when parsing a page with a drink with an integer price value (e.g. "£5")', () => {
        let drinksBoardPage: IDrinksBoardPage;
        let drink: Drink;

        beforeEach(() => {
            pageFixture = fs.readFileSync(
              path.join(__dirname, '../../../../../test/fixtures/integer-price.html')
            ).toString();

            drinksBoardPage = drinksBoardPageFactory.createDrinksBoardPage(pageFixture);

            drink = drinksBoardPage.getAllDrinks()[0];
        });

        it('should report the price as "5.0"', () => {
            expect(drink.price).to.equal(5.0);
        });

        it('should report the formatted price as "£5.00"', () => {
            expect(drink.formattedPrice).to.equal('£5.00');
        });
    });
});
