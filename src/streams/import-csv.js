import fs from 'node:fs'
import { parse } from 'csv-parse'

// const parser = fs.readFile('./src/streams/tasks.csv', 'utf-8', (err, data) => data).then((data) => {console.log(parse(data))})

const csv = new URL('./tasks.csv', import.meta.url)

const processFile = async () => {
  const records = []
  const parser = fs.createReadStream(csv).pipe(parse())

  for await (const chunk of parser) {
      records.push(chunk)
  }

  return records
}

(async () => {
  const records = await processFile();
  console.info(records);
})();

fetch('http://localhost:3334', {
  method: 'POST',
  body: processFile(),
  duplex: "half"
}).then(res => {
  return res.text()
}).then(data => {
  console.log(data)
})