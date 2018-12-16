const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public')); // js, css, images

app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
})

const server = app.listen(80, function() {
  console.log('Server listening on 80');
});

app.get('/', (req, res)=>{
  res.send(index.html);
});

app.get('/myservice/object', (req,res) => {
	res.send({'message':'Heres your response'});
});

app.post('/myservice/object', (req,res) => {
	if (req.body.name) {
		res.send({'message':`Welcome to the symposium ${req.body.name} !!`});
	} else {
		res.send({'message':'Welcome! I would like to know more about you, POST with your name please?'});
	}
})