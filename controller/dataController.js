const dataHandler = (Datas, validationResult) => {
  /**
   * @param       GET /
   * @desc        displays all the Items
   * @access      public( Every one can access)
   */

  const data = async (req, res) => {
    try {
      const total = await Datas.countDocuments();
      const data = await Datas.find({});
      res.status(200).json({
        message: 'sucess',
        data: {
          "Total Data": total,
          data: (total < 1) ? "No Data Created" : data
        },
      });
    } catch (err) {
      res.json({
        message: 'fail',
        Error: err
      });
    }
  };


  /**
   * @param       POST /
   * @desc        Create a new Data
   * @access      public( Every one can access)
   */

  const createData = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    try {

      const {
        name,
        email,
        country
      } = req.body;

      const data = new Datas({
        name,
        email,
        country
      });
      await data.save((err, data) => {

        //duplicate key
        if (err) {
          console.log(err)
          if (err.code === 11000) return res.json({
            message: 'fail',
            Error: `${err.keyValue.email} already exist`
          })
          throw new Error('Data not saved')
        }

        console.log('Data has been saved')

        res.status(202).json({
          message: 'sucess',
          data: data
        });
      });

    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: 'fail',
        Error: err
      });
    }
  };

  /**
   * @param       DELETE /
   * @desc        Deletes data from the database
   * @access      public( Every one can access)
   */

  const deleteData = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    try {

      const {
        email
      } = req.body

      await Datas.findOne({
        email
      }, (err, i) => {

        if (i !== null) i.delete()

        return res.json({
          message: (i === null) ? 'fail' : 'success',
          data: (i === null) ? `${email} doesn't exist` : `${email} successfully deleted`,
        })
      })

    } catch (err) {

      return res.status(500).json({
        message: 'fail',
        Error: err
      })

    }
  }


  /**
   * @param       PATCH /
   * @desc        Update an existing data
   * @access      public( Every one can access)
   */

  const updateData = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    try {

      const {
        name,
        email,
        country
      } = req.body

      await Datas.findOne({
        _id: req.params.itemID
      }, async (err, data) => {
        if (data === null) {
          console.log(req.params)
          return res.json({
            message: 'fail',
            data: `The ID [${req.params.itemID}] provided  in the param doesn't exist`
          })
        }

          await Datas.updateOne({}, {
            $set: {
              name: (name) ? name : data.name,
              email: (email) ? email : data.email,
              country: (country) ? country : data.country,
            }
          })

      })

      res.json({
        message: 'success',
        data: `data updated successfully`
      })

    } catch (err) {

      // res.status(500).json({
      //   message: 'fail',
      //   Error: err
      // })
    }
  }

  return {
    data,
    createData,
    deleteData,
    updateData
  };
};

module.exports = dataHandler;