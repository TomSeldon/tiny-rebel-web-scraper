# Tiny Rebel web scraper

> A small library for querying available drinks at Tiny Rebel bars

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
