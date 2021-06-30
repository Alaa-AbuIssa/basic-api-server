'use strict';

module.exports = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    next('Request body must have both name and price');
  } else {
    next();
  }
};