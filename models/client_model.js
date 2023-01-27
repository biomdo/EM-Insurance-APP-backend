const ClientModel = (sequelize, Sequelize) => {
  const Client = sequelize.define('tbl_client', {
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    id_number: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
    },
    phone_number: {
      type: Sequelize.STRING,
    },
    occupation: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'active',
    },
  })

  return Client
}
export default ClientModel
