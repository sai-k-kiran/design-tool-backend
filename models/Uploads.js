const User = require('./User')

module.exports = (sequelize, DataTypes) => {
	const Uploads = sequelize.define("Uploads", {
		type: {
	      type: DataTypes.STRING,
	    },
	    name: {
	      type: DataTypes.STRING,
	    }
	})
	Uploads.associate = (models) => {
		Uploads.belongsTo(models.User, {
			as: 'user'
		})
	}
	return Uploads;

} 

