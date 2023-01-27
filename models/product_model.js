const ProductModel = (sequelize, Sequelize) => {
  const Product = sequelize.define('tbl_product', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    period: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    amount: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'active',
    },
  })

  return Product
}
export default ProductModel
