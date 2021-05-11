const validation = (check) => {
  const dataInputCheck = [
    check("name")
    .not().isEmpty()
    .withMessage('Name is required'),

    check('email')
    .isEmail()
    .normalizeEmail()
    .not().isEmpty()
    .withMessage('Email is required'),

    check("country")
    .not().isEmpty()
    .withMessage('Country is required'),
  ]

  const nameMustBeProvided = [
    check("email")
    .isEmail()
    .normalizeEmail()
    .not().isEmpty()
    .withMessage('Please provide the email of the data you want to delete'),
  ]

  return {
    dataInputCheck,
    nameMustBeProvided
  };
};

module.exports = validation;