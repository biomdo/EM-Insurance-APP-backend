const ClientProductModel = (sequelize, Sequelize) => {
  const ClientProduct = sequelize.define('tbl_client_product', {
    client_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    start_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    end_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'active',
    },
  })

  return ClientProduct
}
export default ClientProductModel
