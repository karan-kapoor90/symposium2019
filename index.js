const express = require('express');
const app = express();


// app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images
//app.use(redirectUnmatched);
// app.use(express.static(__dirname + '/node_modules')); // node modules

//function redirectUnmatched(req, res) {
//  res.redirect('/');
//}
const server = app.listen(80, function() {
  console.log('Server listening on 80');
});

app.get('/', (req, res)=>{
  console.log('Intercepted.');
  res.send(index.html);
});


