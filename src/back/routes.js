var db = require('./db').db,
    ObjectID = require('mongodb').ObjectID,
    multiparty = require('multiparty'),
    fs = require('fs');

var timeNow = function () {
	var date = new Date(),
	timeNow = date.getHours().toString() + ':' + 
		date.getMinutes().toString() + ':' + 
		date.getSeconds().toString() + ':' + 
		date.getMilliseconds().toString();
	console.log('  - ' + timeNow + '\n' + '    connection closed');
};

// завантаження зображення на сервер
var file = function(req, res, next) {
    // создаем форму
    var form = new multiparty.Form();
    //здесь будет храниться путь k загружаемому файлу, его тип и размер
    var uploadFile = {uploadPath: '', type: '', size: 0};
    //максимальный размер файла
    var maxSize = 2 * 1024 * 1024; //2MB
    //поддерживаемые типы(в данном случае это картинки формата jpeg, jpg и png)
    var supportMimeTypes = ['image/jpg', 'image/png'];
    //массив с ошибками произошедшими в ходе загрузки файла
    var errors = [];

     //если произошла ошибка
    form.on('error', function(err){
        if(fs.existsSync(uploadFile.path)) {
            //если загружаемый файл существует удаляем его
            fs.unlinkSync(uploadFile.path);
            console.log('error');
        }
    });

    form.on('close', function() {
        //если нет ошибок и все хорошо
        if(errors.length == 0) {
            //сообщаем что все хорошо
            res.send({status: 'ok', text: 'Success'});
        }
        else {
            if(fs.existsSync(uploadFile.path)) {
                //если загружаемый файл существует удаляем его
                fs.unlinkSync(uploadFile.path);
            }
            //сообщаем что все плохо и какие произошли ошибки
            res.send({status: 'bad', errors: errors});
        }
    });

    // при поступление файла
    form.on('part', function(part) {
        //читаем его размер в байтах
        uploadFile.size = part.byteCount;
        //читаем его тип
        uploadFile.type = part.headers['content-type'];
        //путь для сохранения файла
        uploadFile.path = __dirname.slice(0, -4) + 'front/images/' + part.filename;//__dirname.slice(0, -4): \src\back повернути до \src\

        //проверяем размер файла, он не должен быть больше максимального размера
        if(uploadFile.size > maxSize) {
            errors.push('File size is ' + uploadFile.size + '. Limit is' + (maxSize / 1024 / 1024) + 'MB.');
        }

        //проверяем является ли тип поддерживаемым
        if(supportMimeTypes.indexOf(uploadFile.type) == -1) {
            errors.push('Unsupported mimetype ' + uploadFile.type);
        }

        //если нет ошибок то создаем поток для записи файла
        if(errors.length == 0) {
            var out = fs.createWriteStream(uploadFile.path);
            part.pipe(out);
        }
        else {
            //пропускаем
            //вообще здесь нужно как-то остановить загрузку и перейти к onclose
            part.resume();
        }
    });

    // парсим форму
    form.parse(req);
};

module.exports = function (app) {

	app.get('/', function (req, res) {
		var path = __dirname.slice(0, -4); // \src\back повернути до \src\
		res.sendFile(path + 'front/index.html');
	});
/*
	app.get('/api/menu', function (req, res) {
		db(function(db) {
			db.collection('menu').find().toArray(function (err, docs) {
				res.send(docs);
				db.close();
				timeNow();
			});
		});
	});
*/
	app.get('/api/collection/:id', function (req, res) {
		var id = req.params.id;
		db(function(db) {
			db.collection(id).find().toArray(function (err, docs) {
				res.send(docs);
				db.close();
				timeNow();
			});
		});
	});
    
    app.post('/api/collection/:id', function (req, res) {
		var id = req.params.id;
		db(function(db) {
			db.collection(id).insertOne(req.body, function (err, docs) {
                if (err) res.send(err);
				res.send('Model saved');
				db.close();
				timeNow();
			});
		});
	});
    
    app.delete('/api/collection/:id/:model', function (req, res) {
		var id = req.params.id,
            model = req.params.model;
		db(function(db) {
			db.collection(id).deleteOne({"_id": ObjectID(model) }, function (err, docs) {
                if (err) res.send(err);
				res.send('Model deleted: ' + model);
				db.close();
				timeNow();
			});
		});
	});
    
    app.post('/api/file', file);

	// 404
	app.use(function (req, res, next) {
  		res.status(404).send("Sorry can't find that!");
	});
}