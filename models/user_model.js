const UserModel = (sequelize, Sequelize) => {
  const User = sequelize.define('tbl_user', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'active',
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  })

  return User
}
export default UserModel
