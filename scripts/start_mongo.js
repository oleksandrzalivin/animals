var exec = require('child_process').exec;

exec('E:/MongoDB/Server/3.4/bin/mongod.exe --dbpath "E:/repository/animals/mongo_db"', function(err, data) {  
    console.log(err);
    console.log(data.toString());              
});