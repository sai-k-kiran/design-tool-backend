module.exports = (sequelize, DataTypes) => {
	const Templates = sequelize.define("Templates", {
		data: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		category: {
			type: DataTypes.STRING,
			allowNull: true
		},
		name: {
	      type: DataTypes.STRING,
	    }
	})
	return Templates;
}