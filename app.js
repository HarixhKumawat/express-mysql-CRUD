const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();


//connecting; deepshah you can stop taking screenshots of my password :| 
const connection=mysql.createConnection({
    host:'localhost',
    user:'test1',
    password:'lolxd',
    database:'work1'
});

connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected!');
}); 

//adding ejs mane to html adn css files!
app.set('views',path.join(__dirname + '/views'));
app.use('/public', express.static(__dirname + "/public"));
			
//settingview engine AS EJS and using middleware to set bodyparser
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//first request aka landing page (home) it is saved as user_index.ejs
app.get('/',(req, res) => {
    // res.send('Landing page works!');
    let sql = "SELECT * FROM users";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('user_index', {
            title : 'Express, Mysql, Node Crud app demo by Harixh Kumawat',
            users : rows
        });
    });
});

//adding new user the form is in user_add.ejs
app.get('/add',(req, res) => {
    res.render('user_add', {
        title : 'Express, Mysql, Node Crud app demo by Harixh Kumawat'
    });
});

//passed by user_add.ejs file on press of save button ahh and also 
app.post('/save',(req, res) => { 
    let data = {name: req.body.name, email: req.body.email, phone_no: req.body.phone_no};
    let sql = "INSERT INTO users SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});


//first we find the one to update
app.get('/edit/:userId',(req, res) => {
    const userId = req.params.userId;
    let sql = `Select * from users where id = ${userId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('user_edit', {
            title : 'Express, Mysql, Node Crud app demo by Harixh Kumawat',
            user : result[0]
        });
    });
});



//then boom update!!!
app.post('/update',(req, res) => {
    const userId = req.body.id;
    let sql = "update users SET name='"+req.body.name+"',  email='"+req.body.email+"',  phone_no='"+req.body.phone_no+"' where id ="+userId;
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});


//delete operation
app.get('/delete/:userId',(req, res) => {
    const userId = req.params.userId;
    let sql = `DELETE from users where id = ${userId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/');
    });
});


// Server Listening
app.listen(3000, () => {
    console.log('App is running successfully, Visit port 3000');
});