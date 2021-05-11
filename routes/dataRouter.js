const express = require('express')

const Datas = require('../models/itemModel')
const { check, validationResult } = require('express-validator')
const { dataInputCheck, nameMustBeProvided } = require('../middleware/inputValidator')(check)

const { data, createData, deleteData, updateData} = require("../controller/dataController")(Datas, validationResult)

const itemRouter = express.Router()

itemRouter.route('/').get(data)
itemRouter.route('/').post(dataInputCheck, createData)
itemRouter.route('/').delete(nameMustBeProvided, deleteData)
itemRouter.route('/:itemID').patch(updateData)

module.exports = itemRouter