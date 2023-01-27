const BankDetailsModel = (sequelize, Sequelize) => {
  const BankDetails = sequelize.define('tbl_bank_details', {
    client_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    bank_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    branch: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    account_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    account_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    primary: {
      type: Sequelize.BOOLEAN,
      default: false,
    },
  })

  return BankDetails
}
export default BankDetailsModel
