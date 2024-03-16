import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

// {
//   "tasks": [
//     {
//       "task": 1
//     },
//     {
//       "task": 2
//     }
//   ]
// }


export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data)
      }).catch(() => {
        this.#persist();
      })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table) {
    const data = this.#database[table] ?? []
    
    return data;
  }

  insert(table, data) {
    if(Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()
  }

  delete(table, id) {
    const index = this.#database[table].findIndex(item => item.id === id);

    if (index > -1) {
      this.#database[table].splice(index, 1);
      this.#persist();
      return // Item deleted successfully
    }
  }
}