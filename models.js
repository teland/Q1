//Modelo Global. Luego habrá modelo por tablas, específicos

var path= require('path');
//llega la adaptación postgres Heroku
//DATABASE_URL=postgres://user:pass@host:port/database
//en local: SQLite DATABASE_URL=sqlite://:@:/

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name=(url[6] ||null);
var user =(url[2] ||null);
var pwd =(url[3] ||null);
var protocol =(url[1] ||null);
var dialect =(url[1]||null);
var port =(url[5] ||null);
var host =(url[4] ||null);
var storage=process.env.DATABASE_STORAGE;

//carga módulo ORM
var Sequelize= require('sequelize');


//usar BBDD sqlite o Postgres
var sequelize=new Sequelize(DB_name,user,pwd,
			{dialect:protocol,
			 protocol:protocol,
			 port: port,
			 host: host,
			 storage:storage,
			 omitNull:true}
	); //fichero y tipo de base de datos que tendrá

//importa definición de tabla para el objeto tipo Quiz desde quiz.js

var quiz_path=path.join(__dirname,'quiz');
var Quiz=sequelize.import(quiz_path);

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
