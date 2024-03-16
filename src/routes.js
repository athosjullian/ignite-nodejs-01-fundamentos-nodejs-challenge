import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';
import { randomUUID } from 'node:crypto'

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
      const { title, description } = req.body
      const uuid = randomUUID()

      const task = {
        "id": uuid,
        "title": title,
        "description": description,
        "completed_at": null,
        "created_at": new Date(),
        "updated_at": new Date()
      }

      database.insert('tasks', task);

      res.writeHead(201).end()
    }
  },
  {
    method: "DELETE",
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      database.delete("tasks", id)
      
      return res.writeHead(204).end()
    }
  }
]