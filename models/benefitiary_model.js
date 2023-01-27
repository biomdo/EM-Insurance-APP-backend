const BenefitiaryModel = (sequelize, Sequelize) => {
  const Benefitiary = sequelize.define('tbl_benefitiary', {
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

  return Benefitiary
}
export default BenefitiaryModel
