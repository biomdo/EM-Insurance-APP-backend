const BeneficiaryModel = (sequelize, Sequelize) => {
  const Beneficiary = sequelize.define('tbl_beneficiary', {
    client_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    relation: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  })

  return Beneficiary
}
export default BeneficiaryModel
