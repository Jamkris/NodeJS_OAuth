module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define(
		'Users',
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				unique: true,
				primaryKey: true,
				autoIncrement: true,
			},
			authId: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			refreshToken: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			profileImg: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			provider: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			paranoid: true,
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
	);

	return Users;
};
