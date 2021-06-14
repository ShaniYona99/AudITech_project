const http = require('http');

const hostname = '192.168.1.109';
const port = 80;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(' Hello World');
});



server.listen(80, hostname);


const events = {
  hostname: hostname,
  port: port,
  path: '/repoEvents',
  method: 'GET'
}

const req = http.request(events, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

// req.end()