const { DataTypes } = require('sequelize');

const country = (sequelize) => {
  return sequelize.define('country', {
    id: {
      type: DataTypes.STRING(3), // Definir el tipo de datos como STRING con una longitud de 3 caracteres
      primaryKey: true, // Marcar como clave primaria
      allowNull: false, // No permitir valores nulos
      unique: true, // Asegurar que sea único
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    area: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    population: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },{
    timestamps: false
  });
};

module.exports = country;
