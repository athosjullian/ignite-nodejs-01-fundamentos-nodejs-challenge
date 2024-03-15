import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const tasks = database.select('tasks')

      res
        .writeHead(200, { 'Content-Type': 'application/json' })
        .end(JSON.stringify(tasks))
    }
  },
  {
    method: "POST",
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { name } = req.body

      const task = {
        "id": 1,
        "name": name,
      }

      database.insert('tasks', task);

      res.writeHead(201).end()
    }
  }
]