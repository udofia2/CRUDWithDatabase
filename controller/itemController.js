const itemHandler = (Items) => {
  const items = async (req, res) => {
    try {
      const items = await Items.find({});
      res.status(200).json({
        message: 'sucess',
        Total: Items.countDocuments(),
        data: items,
      });
    } catch (err) {
      res.json({
        message: 'fail',
        data: err
      });
    }
  };

  const createItem = async (req, res) => {
    try {

      const {
        name,
        description
      } = req.body;

      const item = new Items({
        name,
        description
      });
      await item.save((err, item) => {
        if (err) throw new Error('item not saved')
        console.log('item has been saved')
      });

      res.status(202).json({
        message: 'sucess',
        data: item
      });
    } catch (err) {
      res.status(500).json({
        message: 'fail',
        data: err
      });
    }
  };

  return {
    items,
    createItem,
  };
};

module.exports = itemHandler;