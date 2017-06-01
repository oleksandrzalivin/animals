var exec = require('child_process').exec,
    path = 'E:/MongoDB/Server/3.4/bin/mongod.exe --dbpath "E:/repository/animals/mongo_db"';

exec(path, function(err, data) {  
    console.log(err);
    console.log(data.toString());              
});