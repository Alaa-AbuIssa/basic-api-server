'use strict';

const express = require('express');
const router = express.Router();
const clothesModel = require('../models/clothes');
const Interface = require('../models/data-collection-class');
const Item = new Interface(clothesModel);
const validator = require('../middlewares/validator');

router.get('/', getItem);
router.get('/:id', getItem);
router.post('/', validator, createItem);
router.put('/:id', validator, updateItem);
router.delete('/:id', deleteItem);


async function getItem(req, res, next) {
  try {
    const id = req.params.id;
    const storedData = await Item.read(id);
    res.json({ storedData });
  }
  catch (e) {
    next(e);
  }
}

async function createItem(req, res, next) {
  try {
    const data = req.body;
    const newItem = await Item.create(data);
    res.json(newItem);
  }
  catch (e) {
    next(e);
  }
}

async function updateItem(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedItem = await Item.update(id, data);
    res.json(updatedItem);
  }
  catch (e) {
    next(e);
  }
}

async function deleteItem(req, res, next) {
  try {
    const id = req.params.id;
    const deletedItem = await Item.delete(id);
    res.json(deletedItem);
  }
  catch (e) {
    next(e);
  }
}

module.exports = router;