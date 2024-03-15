import http from 'node:http'
import { json } from './middlewares/json.js';
import { routes } from './routes.js';


const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  
  await json(req, res)
  
  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    return route.handler(req, res)    
  }

  // if (method === 'POST' && url == '/tasks') {
  //   const { name } = req.body

  //   const task = {
  //     "id": 1,
  //     "name": name,
  //   }

  //   database.insert('tasks', task);

  //   res.writeHead(201).end()
  // }

  res.end();
})

server.listen(3334, () => {
  console.log('Servidor aberto em http://localhost:3334')
});