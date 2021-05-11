const validation = (check) => {
  const itemIputCheck = [
    check("name")
    .not().isEmpty()
    .withMessage('Name is required'),
    check("description")
    .not().isEmpty()
    .withMessage('Description is required'),
  ]

  const nameMustBeProvided = [
    check("name")
    .not().isEmpty()
    .withMessage('Please provide the name of the item you want to delete'),
  ]
  return {
    itemIputCheck,
    nameMustBeProvided
  };
};

module.exports = validation;