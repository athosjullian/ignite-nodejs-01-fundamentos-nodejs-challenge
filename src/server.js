import http from 'node:http'
import { json } from './middlewares/json.js';

const database = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res)

  if (method === 'GET' && url == '/tasks') {
    res
      .writeHead(200, { 'Content-Type': 'application/json' })
      .end(JSON.stringify(database))
  }

  if (method === 'POST' && url == '/tasks') {
    const { name } = req.body

    const task = {
      "id": 1,
      "name": name,
    }

    database.push(task)

    res.writeHead(201).end()
  }

  res.end();
})

server.listen(3334, () => {
  console.log('Servidor aberto em http://localhost:3334')
});