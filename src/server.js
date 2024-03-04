import http from 'node:http'

const database = []

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'GET' && url == '/tasks') {
    res
      .writeHead(200, { 'Content-Type': 'application/json' })
      .end(JSON.stringify(database))
  }

  if (method === 'POST' && url == '/tasks') {
    const task = {
      "id": 1,
      "name": "task",
    }

    database.push(task)

    res.writeHead(201).end()
  }

  res.end();
})

server.listen(3334, () => {
  console.log('Servidor aberto em http://localhost:3334')
});