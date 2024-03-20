import { parse } from 'csv-parse'
import fs from 'node:fs'

// const parser = fs.readFile('./src/streams/tasks.csv', 'utf-8', (err, data) => data).then((data) => {console.log(parse(data))})

const csv = new URL('./tasks.csv', import.meta.url)
const stream = fs.createReadStream(csv)
const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2
})

const processFile = async () => {
  const parser = stream.pipe(csvParse)

  for await (const chunk of parser) {
    const [title, description] = chunk;

    await fetch('http://localhost:3334/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
    })

    await wait(1000)
  }
}

processFile()

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// fetch('http://localhost:3334', {
//   method: 'POST',
//   body: processFile(),
//   duplex: "half"
// }).then(res => {
//   return res.text()
// }).then(data => {
//   console.log(data)
// })