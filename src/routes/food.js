'use strict';

const Food = require('../models/food');
const express = require('express');
const router = express.Router();
const food = new Food();


router.get('/', getFood);
router.get('/:id', getFood);
router.post('/', createFood);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);



function getFood(req, res) {
  const Obj = food.read(req.params.id);
  res.json(Obj);
}

function createFood(req, res) {
  const Obj = food.create(req.body);
  res.json(Obj);
}

function updateFood(req, res) {
  const Obj = food.update(req.params.id, req.body);
  res.json(Obj);
}

function deleteFood(req, res) {
  const Obj = food.delete(req.params.id);
  res.json(Obj);
}


module.exports = router;