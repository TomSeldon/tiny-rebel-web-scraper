import * as chai from 'chai';
import * as request from 'request';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import { API } from '../../../lib/api';
import { Drink } from '../../../lib/common-types';

const expect = chai.expect;

chai.use(sinonChai);

describe('API', () => {
    let api: API;
    let requestSpy: sinon.SinonStub;
    let mockDrinks: Drink[];

    beforeEach(() => {
        mockDrinks = [];

        const mockDrinksBoardPageFactory = {
            createDrinksBoardPage () {
                return {
                    getAllDrinks () {
                        return mockDrinks;
                    }
                };
            }
        };

        requestSpy = sinon.stub(request, 'get');

        api = new API(mockDrinksBoardPageFactory, request);
    });

    afterEach(() => {
        requestSpy.restore();
    });

    describe('getting all drinks', () => {
        it('should not allow drinks to be requested when a bar location has not been specified', (done) => {
            api.getAllDrinks('')
                .catch((error: Error) => {
                    expect(error.message).to.equal('No bar location specified');
                    done();
                });
        });

        it('should not allow drinks to be requested for unsupported bar locations', (done) => {
            api.getAllDrinks('an unsupported bar')
                .catch((error: Error) => {
                    expect(error.message).to.equal('Unknown bar location specified');
                    done();
                });
        });

        it('should make a GET request to the correct URL', () => {
            api.getAllDrinks('cardiff');

            expect(requestSpy).to.have.been.calledWith('http://www.tinyrebel.co.uk/bars/cardiff/beer-board/');
        });

        it('should reject when the HTTP call errors', (done) => {
            requestSpy.yields(new Error('Some HTTP error'));

            api.getAllDrinks('cardiff')
                .catch((error: Error) => {
                    expect(error.message).to.equal('Unable to load beer board');
                    done();
                });
        });

        it('should reject when the HTTP request results in a server error', (done) => {
            const response = {
                statusCode: 500
            };

            requestSpy.yields(null, response);

            api.getAllDrinks('cardiff')
                .catch((error: Error) => {
                    expect(error.message).to.equal('Unable to load beer board');
                    done();
                });
        });

        it('should reject when the HTTP request results in a 404 not found', (done) => {
            const response = {
                statusCode: 404
            };

            requestSpy.yields(null, response);

            api.getAllDrinks('cardiff')
                .catch((error: Error) => {
                    expect(error.message).to.equal('Unable to load beer board');
                    done();
                });
        });

        it('should resolve with an array of drinks', (done) => {
            mockDrinks = [
                {
                    abv: '4.2%',
                    available: true,
                    brewery: 'Tiny Rebel Brewing Co. (Newport, South Wales)',
                    cask: true,
                    currency: 'GBP',
                    formattedPrice: '£3.30',
                    keg: false,
                    name: 'You Snows It',
                    price: 3.3,
                    quantity: 'pint',
                    style: 'Pale Ale',
                    vegan: false
                }
            ];

            const response = {
                statusCode: 200
            };

            /*
              The parsed drinks are mocked, so we just need to pass in a string for the body
              but the actual content doesn't matter here
            */
            const body = '';

            requestSpy.yields(null, response, body);

            api.getAllDrinks('cardiff')
                .then((drinks: Drink[]) => {
                    expect(drinks.length).to.equal(1);
                    done();
                })
                .catch((error: Error) => {
                    if (error) {
                        done(error);
                    }
                });
        });
    });

    describe('getting all keg drinks', () => {
        it('should not allow drinks to be requested when a bar location has not been specified', (done) => {
            api.getAllKegDrinks('')
                .catch((error: Error) => {
                    expect(error.message).to.equal('No bar location specified');
                    done();
                });
        });

        it('should not allow drinks to be requested for unsupported bar locations', (done) => {
            api.getAllKegDrinks('an unsupported bar')
                .catch((error: Error) => {
                    expect(error.message).to.equal('Unknown bar location specified');
                    done();
                });
        });

        it('should make a GET request to the correct URL', () => {
            api.getAllKegDrinks('cardiff');

            expect(requestSpy).to.have.been.calledWith('http://www.tinyrebel.co.uk/bars/cardiff/beer-board/');
        });

        it('should reject when the HTTP call errors', (done) => {
            requestSpy.yields(new Error('Some HTTP error'));

            api.getAllKegDrinks('cardiff')
                .catch((error: Error) => {
                    expect(error.message).to.equal('Unable to load beer board');
                    done();
                });
        });

        it('should reject when the HTTP request results in a server error', (done) => {
            const response = {
                statusCode: 500
            };

            requestSpy.yields(null, response);

            api.getAllKegDrinks('cardiff')
                .catch((error: Error) => {
                    expect(error.message).to.equal('Unable to load beer board');
                    done();
                });
        });

        it('should reject when the HTTP request results in a 404 not found', (done) => {
            const response = {
                statusCode: 404
            };

            requestSpy.yields(null, response);

            api.getAllKegDrinks('cardiff')
                .catch((error: Error) => {
                    expect(error.message).to.equal('Unable to load beer board');
                    done();
                });
        });

        it('should resolve with an array of only the keg drinks', (done) => {
            mockDrinks = [
                {
                    abv: '4.2%',
                    available: true,
                    brewery: 'Tiny Rebel Brewing Co. (Newport, South Wales)',
                    cask: true,
                    currency: 'GBP',
                    formattedPrice: '£3.30',
                    keg: false,
                    name: 'You Snows It',
                    price: 3.3,
                    quantity: 'pint',
                    style: 'Pale Ale',
                    vegan: false
                },
                {
                    abv: '4.2%',
                    available: true,
                    brewery: 'Tiny Rebel Brewing Co. (Newport, South Wales)',
                    cask: false,
                    currency: 'GBP',
                    formattedPrice: '£3.70',
                    keg: true,
                    name: 'Urban Pils',
                    price: 3.7,
                    quantity: 'pint',
                    style: 'Pilsner',
                    vegan: false
                }
            ];

            const response = {
                statusCode: 200
            };

            /*
              The parsed drinks are mocked, so we just need to pass in a string for the body
              but the actual content doesn't matter here
            */
            const body = '';

            requestSpy.yields(null, response, body);

            api.getAllKegDrinks('cardiff')
                .then((drinks: Drink[]) => {
                    expect(drinks.length).to.equal(1);
                    expect(drinks[0]).to.deep.equal(mockDrinks[1]);
                    done();
                })
                .catch((error: Error) => {
                    if (error) {
                        done(error);
                    }
                });
        });
    });

    describe('getting all cask drinks', () => {
        it('should not allow drinks to be requested when a bar location has not been specified', (done) => {
            api.getAllCaskDrinks('')
                .catch((error: Error) => {
                    expect(error.message).to.equal('No bar location specified');
                    done();
                });
        });

        it('should not allow drinks to be requested for unsupported bar locations', (done) => {
            api.getAllCaskDrinks('an unsupported bar')
                .catch((error: Error) => {
                    expect(error.message).to.equal('Unknown bar location specified');
                    done();
                });
        });

        it('should make a GET request to the correct URL', () => {
            api.getAllCaskDrinks('cardiff');

            expect(requestSpy).to.have.been.calledWith('http://www.tinyrebel.co.uk/bars/cardiff/beer-board/');
        });

        it('should reject when the HTTP call errors', (done) => {
            requestSpy.yields(new Error('Some HTTP error'));

            api.getAllCaskDrinks('cardiff')
                .catch((error: Error) => {
                    expect(error.message).to.equal('Unable to load beer board');
                    done();
                });
        });

        it('should reject when the HTTP request results in a server error', (done) => {
            const response = {
                statusCode: 500
            };

            requestSpy.yields(null, response);

            api.getAllCaskDrinks('cardiff')
                .catch((error: Error) => {
                    expect(error.message).to.equal('Unable to load beer board');
                    done();
                });
        });

        it('should reject when the HTTP request results in a 404 not found', (done) => {
            const response = {
                statusCode: 404
            };

            requestSpy.yields(null, response);

            api.getAllCaskDrinks('cardiff')
                .catch((error: Error) => {
                    expect(error.message).to.equal('Unable to load beer board');
                    done();
                });
        });

        it('should resolve with an array of only the cask drinks', (done) => {
            mockDrinks = [
                {
                    abv: '4.2%',
                    available: true,
                    brewery: 'Tiny Rebel Brewing Co. (Newport, South Wales)',
                    cask: true,
                    currency: 'GBP',
                    formattedPrice: '£3.30',
                    keg: false,
                    name: 'You Snows It',
                    price: 3.3,
                    quantity: 'pint',
                    style: 'Pale Ale',
                    vegan: false
                },
                {
                    abv: '4.2%',
                    available: true,
                    brewery: 'Tiny Rebel Brewing Co. (Newport, South Wales)',
                    cask: false,
                    currency: 'GBP',
                    formattedPrice: '£3.70',
                    keg: true,
                    name: 'Urban Pils',
                    price: 3.7,
                    quantity: 'pint',
                    style: 'Pilsner',
                    vegan: false
                }
            ];

            const response = {
                statusCode: 200
            };

            /*
              The parsed drinks are mocked, so we just need to pass in a string for the body
              but the actual content doesn't matter here
            */
            const body = '';

            requestSpy.yields(null, response, body);

            api.getAllCaskDrinks('cardiff')
                .then((drinks: Drink[]) => {
                    expect(drinks.length).to.equal(1);
                    expect(drinks[0]).to.deep.equal(mockDrinks[0]);
                    done();
                })
                .catch((error: Error) => {
                    if (error) {
                        done(error);
                    }
                });
        });
    });
});
