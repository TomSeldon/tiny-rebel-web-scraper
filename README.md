# Tiny Rebel web scraper

> A small library for querying available drinks at Tiny Rebel bars

[![Build Status](https://travis-ci.org/TomSeldon/tiny-rebel-web-scraper.svg?branch=master)](https://travis-ci.org/TomSeldon/tiny-rebel-web-scraper)
[![Build status](https://ci.appveyor.com/api/projects/status/pi4ja5d7uchwg2c7/branch/master?svg=true)](https://ci.appveyor.com/project/TomSeldon/tiny-rebel-web-scraper/branch/master)

- [Basic usage](#basic-usage)
- [API](#api)
  - [getAllDrinks](#getalldrinks)
  - [getAllKegDrinks](#getallkegdrinks)
  - [getAllCaskDrinks](#getallcaskdrinks)
  - [Return values](#return-values)

## Basic usage

`npm install tiny-rebel-web-scraper`

```javascript
const tinyRebelWebScraper = require('tiny-rebel-web-scraper');

// Bar location should be specified as "cardiff" or "newport"
tinyRebelWebScraper.getAllDrinks('cardiff')
    .then((drinks) => {
        for (const drink of drinks) {
            console.log(`${drink.name}: ${drink.formattedPrice}`);
        }
    })
    .catch((error) => {
        // Failed to load what drinks are available
        console.error(error);
        throw error;
    });
```

## API

### `getAllDrinks`

Get all drinks at the specified bar.

#### Method signature

```javascript
getAllDrinks (barLocation: string): Promise<Drink[]>
```

### `getAllKegDrinks`

Get all keg drinks at the specified bar.

#### Method signature

```javascript
getAllKegDrinks (barLocation: string): Promise<Drink[]>
```

### `getAllCaskDrinks`

Get all cask drinks at the specified bar.

#### Method signature

```javascript
getAllCaskDrinks (barLocation: string): Promise<Drink[]>
```

## Return values

The API will return an array of `Drink` objects, i.e. POJOs with the following properties.

```javascript
// Drink
{
    abv: 4.2,
    available: true,
    brewery: 'Tiny Rebel Brewing Co. (Newport, South Wales)',
    cask: true,
    currency: 'GBP',
    formattedAbv: '4.2%',
    formattedPrice: '£3.30',
    keg: false,
    name: 'You Snows It',
    price: 3.3,
    quantity: 'pint',
    style: 'Pale Ale',
    vegan: false
}
```

**Note:** Pricing information for drinks will not always be available, in which case the `price` will be reported as `null`
and the `formattedPrice` will be reported as `'Unknown'`.
