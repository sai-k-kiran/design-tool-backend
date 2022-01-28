module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		name: {
			type: DataTypes.STRING(20),
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		password: {
			type: DataTypes.STRING(100),
			allowNull: true,

		},
		googleId: {
			type: DataTypes.STRING(100),
			allowNull: true,

		},
		facebookId: {
			type: DataTypes.STRING(100),
			allowNull: true,

		},
		linkedInId: {
			type: DataTypes.STRING(100),
			allowNull: true,

		},
		company: {
			type: DataTypes.STRING,
			allowNull: true
		},
		logo: {
			type: DataTypes.STRING,
			allowNull: true
		},
		address: {
			type: DataTypes.STRING(100)	,
			allowNull: true
		},
		phone: {
			type: DataTypes.STRING(100)	,
			allowNull: true
		}
	})
	
	User.associate = (models) => {
		User.hasMany(models.Design, {
			onDelete: "cascade",
			foreignKey: 'userId'
		}),
		User.hasMany(models.Uploads, {
			onDelete: "cascade",
			foreignKey: 'userId'
		})
    }
	return User;
}