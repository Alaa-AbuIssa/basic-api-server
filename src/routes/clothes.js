'use strict';

const express = require('express');
const Clothes = require('../models/clothes');
const router = express.Router();
const Item = new Clothes();


router.get('/', getItem);
router.get('/:id', getItem);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);





function getItem(req, res) {
  const Obj = Item.read(req.params.id);
  res.json(Obj);
}

function createItem(req, res) {
  const Obj = Item.create(req.body);
  res.json(Obj);
}

function updateItem(req, res) {
  const Obj = Item.update(req.params.id, req.body);
  res.json(Obj);
}

function deleteItem(req, res) {
  const Obj = Item.delete(req.params.id);
  res.json(Obj);
}


module.exports = router;