const { DataTypes, UUIDV4 } = require('sequelize');

const activity = (sequelize) => {
  sequelize.define('activity', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING, // O el tipo de dato que prefieras
      allowNull: true, // Puedes permitir que la URL de la imagen sea opcional
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    season: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    timestamps: false
  });
};

module.exports = activity;