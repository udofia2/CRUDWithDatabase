const express = require('express')

const Items = require('../models/itemModel')
const { check, validationResult } = require('express-validator')
const { itemIputCheck, nameMustBeProvided } = require('./../middleware/inputValidator')(check)

const { items, createItem, deleteItem, editItem} = require("../controller/itemController")(Items, validationResult)

const itemRouter = express.Router()

itemRouter.route('/').get(items)
itemRouter.route('/').post(itemIputCheck, createItem)
itemRouter.route('/').delete(nameMustBeProvided, deleteItem)
itemRouter.route('/:itemID').patch(nameMustBeProvided, editItem)

module.exports = itemRouter