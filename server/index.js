const http = require('http');
const hostname = '192.168.1.109';
const port = 80;


const server = http.createServer((req, res) => {
  res.statusCode = 200;

  res.setHeader('Content-Type', 'text/plain');
  res.write(' Hello World');
  res.end()
});



server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//listen for req
// app.listen(port,hostname);

// app.get('/payload',(req,res) =>{
//   res.send('<p>payload</p>')
// })







// const events = {
//   hostname: hostname,
//   port: port,
//   path: '/repoEvents',
//   method: 'GET'
// }

// const req = http.request(events, res => {
//   console.log(`statusCode: ${res.statusCode}`)

//   res.on('data', d => {
//     process.stdout.write(d)
//   })
// })

// req.on('error', error => {
//   console.error(error)
// })

// // req.end()