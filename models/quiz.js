
//Definición del modelo de Quiz, es la definición de la tabla de la base de datos

module.exports= function(sequelize, DataTypes){
   return sequelize.define('Quiz',
			{pregunta: DataTypes.STRING, //dos campos en un objeto, con su tipo
			 respuesta: DataTypes.STRING,
			});
}

