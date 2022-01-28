const User = require('./User')

module.exports = (sequelize, DataTypes) => {
	const Design = sequelize.define("Design", {
		data: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	})
	Design.associate = (models) => {
		Design.belongsTo(models.User, {
			as: 'user'
		})
	}

	return Design;
}