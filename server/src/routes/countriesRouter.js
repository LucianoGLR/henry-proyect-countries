const { Router } = require("express");
const { getCountries, getDetail } = require('../handlers/countriesHandlers');

const countriesRouter = Router();

countriesRouter.get('/', getCountries);
countriesRouter.get('/:id', getDetail);

module.exports = countriesRouter;