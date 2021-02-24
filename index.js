//Setting Things up
const express = require('express');
const admin = require('firebase-admin');
var cors = require('cors');
const bp = require("body-parser");
const serviceAccount = require("./key.json");
const app = express();
const functions = require('./functions.js');
var mailer = require('./mailer.js')
app.use(cors()); 
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
const port = 3000; 
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('views'));
app.listen(port);
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "====="
});
const db = admin.firestore();
//====================================================
app.get('/join', function(req, res) {
	res.render("joinpage", {message:""})
})
app.get('/docs', function(req, res) {
	res.render('documentation', {message:""})
});

app.post('/email', async (req, res) => {
	var email = `${req.body.Email}`;
	var key = functions.generate(10)
	mailer.sendMail(email, key)
	var data = {
		apiKey: key,
		email: email
	}
	db.collection('PoopyAPIKeys').doc(key).set(data);
	res.render('joinpage', {message:"Email sent successfully!"})
});

app.get('/random', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	var key = req.query.key;
	var ref = db.collection('PoopyAPIKeys').doc(key);
	var doc = await ref.get();
	var dataRef = db.collection('PoopyAPIKeys').doc('Data');
	var dataDoc = await dataRef.get();
	if (!doc.exists) {
		var data = {
			message: "Invalid API key. Please create an API key at /join!"
		}
		res.send(JSON.stringify(data))
	}
	if (doc.exists){
		var id = functions.randint(0, (dataDoc.data().Data.length));
		var data = {
			id: id,
			joke: dataDoc.data().Data[id].joke
		}
		res.send(JSON.stringify(data))
	}

});


app.get('/byID', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	var key = req.query.key;
	var id = req.query.id;
	var ref = db.collection('PoopyAPIKeys').doc(key);
	var doc = await ref.get();
	var dataRef = db.collection('PoopyAPIKeys').doc('Data');
	var dataDoc = await dataRef.get();
	if (!doc.exists) {
		var data = {
			message: "Invalid API key. Please create an API key at /join!"
		}
		res.send(JSON.stringify(data))
	}
	if (!req.query.id) {
		var data = {
			message: "Invalid parameters. Please include an id in the URL."
		}
		res.send(JSON.stringify(data));		
	}
	if (!req.query.id && doc.exists) {
		var data = {
			message: "Invalid parameters. Remember to include an ID."
		}
		res.send(JSON.stringify(data));		
	}
	if (doc.exists && req.query.id){
		var data = {
			id: id,
			joke: dataDoc.data().Data[id].joke
		}
		res.send(JSON.stringify(data))
	}

});

app.get('/all', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	var apiKey = req.query.key;
	var ref = db.collection('PoopyAPIKeys').doc(apiKey);
	var doc = await ref.get();
	var dataRef = db.collection('PoopyAPIKeys').doc('Data');
	var dataDoc = await dataRef.get();
	if (!doc.exists) {
		var message = {message:"Invalid API key. Please create an api key at /join!"}
		res.send(JSON.stringify(message))
	}
	else {
		var allData = dataDoc.data().Data;
		var data = {data:allData}
		res.send(JSON.stringify(data));
	}
})


app.post('/', function(req, res) {res.send("")})

app.post('/submitJoke', async (req, res) => {
	var joke = req.body.joke
	var key = req.query.key;
	var ref = db.collection('PoopyAPIKeys').doc('Data');
	var doc = await ref.get();
	var length = doc.data().Pending.length;
	var id = length;
	var data = {
		id: id,
		joke: joke,
		posterKey: key
	}
	ref.update({
		Pending: admin.firestore.FieldValue.arrayUnion(data)
	});
})

app.post('/addJoke', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	var apiKey = req.query.id;
	if (apiKey == "NuDbYfuXyW") {
	var joke = req.body.joke
	var ref = db.collection('PoopyAPIKeys').doc('Data');
	var doc = await ref.get();
	var length = doc.data().Data.length;
	var id = length;
	var data = {
		id: id,
		joke: joke
	}
	ref.update({
		Data: admin.firestore.FieldValue.arrayUnion(data)
	});
	var message = {
		message: "Joke added successfully."
	}
	res.send(JSON.stringify(message))	
	}
	else {
		var message = {
			message: "Invalid API key. You must have an admin key in order to perform this function."
		}
		res.send(JSON.stringify(message))
	}
})

app.post('/reportJoke', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	var apiKey = req.query.key;
	var keyRef = db.collection('PoopyAPIKeys').doc(apiKey);
	var keyDoc = await keyRef.get();
	if (!keyDoc.exists) {
		var message = {message:"Invalid API key!"}
		res.send(JSON.stringify(message))
	}
	else {
		var data = {
			id: req.body.id,
			reason: req.body.reason
		}
		var ref = db.collection('PoopyAPIKeys').doc('Data');
		var doc = await ref.get();
		ref.update({
			Reports: admin.firestore.FieldValue.arrayUnion(data)
		});		
	}
})
//=====================================================

