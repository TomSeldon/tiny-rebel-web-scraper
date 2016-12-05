const chai = require('chai');
const lib = require('../../dist');

const expect = chai.expect;

describe('Integration tests', () => {
    describe('#getAllDrinks', () => {
        it('should be able to get all of the drinks from the Cardiff beer board', done => {
            lib.getAllDrinks('cardiff')
                .then(drinks => {
                    expect(drinks.length).to.be.greaterThan(0);
                    done();
                })
                .catch(error => {
                    if (error) {
                        done(error);
                    }
                });
        });

        it('all drinks from the Cardiff beer board should have names', done => {
            lib.getAllDrinks('cardiff')
                .then(drinks => {
                    for (const drink of drinks) {
                        expect(drink.name).not.to.be.undefined;
                        expect(drink.name).to.be.a('string');
                        expect(drink.name.length).to.be.greaterThan(0);
                    }

                    done();
                })
                .catch(error => {
                    if (error) {
                        done(error);
                    }
                });
        });

        it('should be able to get all of the drinks from the Newport beer board', done => {
            lib.getAllDrinks('newport')
                .then(drinks => {
                    expect(drinks.length).to.be.greaterThan(0);
                    done();
                })
                .catch(error => {
                    if (error) {
                        done(error);
                    }
                });
        });

        it('all drinks from the Newport beer board should have names', done => {
            lib.getAllDrinks('newport')
                .then(drinks => {
                    for (const drink of drinks) {
                        expect(drink.name).not.to.be.undefined;
                        expect(drink.name).to.be.a('string');
                        expect(drink.name.length).to.be.greaterThan(0);
                    }

                    done();
                })
                .catch(error => {
                    if (error) {
                        done(error);
                    }
                });
        });
    });

    describe('#getAllKegDrinks', () => {
        it('should be able to get all of the keg drinks from the Cardiff beer board', done => {
            lib.getAllKegDrinks('cardiff')
                .then(drinks => {
                    expect(drinks.length).to.be.greaterThan(0);
                    done();
                })
                .catch(error => {
                    if (error) {
                        done(error);
                    }
                });
        });

        it('should be able to get all of the keg drinks from the Newport beer board', done => {
            lib.getAllKegDrinks('newport')
                .then(drinks => {
                    expect(drinks.length).to.be.greaterThan(0);
                    done();
                })
                .catch(error => {
                    if (error) {
                        done(error);
                    }
                });
        });
    });

    describe('#getAllCaskDrinks', () => {
        it('should be able to get all of the cask drinks from the Cardiff beer board', done => {
            lib.getAllCaskDrinks('cardiff')
                .then(drinks => {
                    expect(drinks.length).to.be.greaterThan(0);
                    done();
                })
                .catch(error => {
                    if (error) {
                        done(error);
                    }
                });
        });

        it('should be able to get all of the cask drinks from the Newport beer board', done => {
            lib.getAllCaskDrinks('newport')
                .then(drinks => {
                    expect(drinks.length).to.be.greaterThan(0);
                    done();
                })
                .catch(error => {
                    if (error) {
                        done(error);
                    }
                });
        });
    });
});
