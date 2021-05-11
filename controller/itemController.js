const itemHandler = (Items, validationResult) => {
  /**
   * @param       GET /
   * @desc        displays all the Items
   * @access      public( Every one can access)
   */

  const items = async (req, res) => {
    try {
      const total = await Items.countDocuments();
      const items = await Items.find({});
      res.status(200).json({
        message: 'sucess',
        data: {
          "Total Items": total,
          items: (total < 1) ? "No Items Created" : items
        },
      });
    } catch (err) {
      res.json({
        message: 'fail',
        data: err
      });
    }
  };


  /**
   * @param       POST /
   * @desc        Create a new Item
   * @access      public( Every one can access)
   */

  const createItem = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    try {

      console.log(req.body)

      const {
        name,
        description
      } = req.body;

      const item = new Items({
        name,
        description
      });
      await item.save((err, item) => {

        //duplicate key
        if (err) {
          console.log(err)
          if (err.code === 11000) return res.json({
            message: 'fail',
            data: 'No data',
            Error: `${err.keyValue.name} already exist`
          })
          throw new Error('item not saved')
        }

        console.log('item has been saved')

        res.status(202).json({
          message: 'sucess',
          data: item
        });
      });

    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: 'fail',
        data: err
      });
    }
  };

  /**
   * @param       DELETE /
   * @desc        Deletes an item from the database
   * @access      public( Every one can access)
   */

  const deleteItem = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    try {

      const {
        name
      } = req.body

      const item = await Items.findOne({
        name
      }, (err, i) => {

        if (i !== null) i.delete()

        return res.json({
          message: (i === null) ? 'fail' : 'success',
          data: (i === null) ? `${name} doesn't exist` : `${name} successfully deleted`,
        })
      })

    } catch (err) {

      return res.status(500).json({
        message: 'fail',
        data: "No data",
        Error: err
      })

    }
  }


  /**
   * @param       PATCH /
   * @desc        Edits an existing item
   * @access      public( Every one can access)
   */

  const editItem = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    try {

      const {
        name
      } = req.body

      const item = await Items.findOne({
        _id: req.params.itemID
      }, async (err, item) => {
        if (item !== null) {

          await Items.updateOne({}, {
            $set: {
              name: (req.body.name) ? req.body.name : item.name,
              description: (req.body.description) ? req.body.description : item.description,
            }
          })

        }

      })
      res.json({
        message: 'success',
        data: `item edited successfully`
      })

    } catch (err) {
      return res.status(500).json({
        message: 'fail',
        data: "No data",
        Error: err
      })
    }
  }

  return {
    items,
    createItem,
    deleteItem,
    editItem
  };
};

module.exports = itemHandler;