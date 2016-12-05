import * as cheerio from 'cheerio';
import * as request from 'request';

import { API } from './api';
import { DrinksBoardPageFactory } from './page-objects/drinks-board';

const drinksBoardPageFactory = new DrinksBoardPageFactory(cheerio);
const api = new API(drinksBoardPageFactory, request);

export = api;
