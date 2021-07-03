'use strict';

const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  name: { type: String },
  description: { type: String },
});

const clothesModel = mongoose.model('clothes', itemSchema);

module.exports = clothesModel;