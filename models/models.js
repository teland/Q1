//Modelo Global. Luego habrá modelo por tablas, específicos

var path= require('path');

//carga módulo ORM
var Sequelize= require('sequelize');

//usar BBDD sqlite
var sequelize=new Sequelize(null,null,null,
			{dialect:'sqlite', storage:'quiz.sqlite'}
	); //fichero y tipo de base de datos que tendrá

//importa definición de tabla para el objeto tipo Quiz desde quiz.js
var Quiz=sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz=Quiz; //exporta la definición de la tabla Quiz

//crea e inicia la tabla de preguntas en DB
sequelize.sync().then(function(){
	//success ejecuta manejador cuando la tabla se ha creado. Es antiguo ahora se usa promises
	Quiz.count().then(function (count){
		if(count===0) {	//la tabla se inicializa solo si está vacía
			Quiz.create({pregunta: 'Capital de Italia',
				respuesta: 'Roma'})
				.then(function(){console.log('Base de datos iniciada')});
		};
	});
});
