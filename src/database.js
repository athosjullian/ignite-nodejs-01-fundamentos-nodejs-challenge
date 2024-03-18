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

  select(table, search) {
    let data = this.#database[table] ?? []

    if(search) {
      data = data.filter(item => {
        return Object.entries(search).some(([key, value]) => {
          return item[key].includes(value)
        })
      })
    }
    
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

  update(table, id, data) {
    let { title, description } = data
    this.#database[table].find(item => {
      if( item.id === id ) {
        item.title = title ?? item.title
        item.description = description ?? item.description
        item.updated_at = new Date()

        this.#persist();
      }
    })
  }

  // update(table, id, data) {
  //   const rowIndex = this.#database[table].findIndex(row => row.id === id)

  //   if (rowIndex > -1) {
  //     const row = this.#database[table][rowIndex]
  //     this.#database[table][rowIndex] = { id, ...row, ...data }
  //     this.#persist()
  //   }
  // }
} 