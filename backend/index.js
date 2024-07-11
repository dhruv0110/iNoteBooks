const connectToMongo = require('./db.js');
const express = require('express')
const auth = require('./routes/auth.js');
const notes = require('./routes/notes.js');
const cors = require('cors')


require('dotenv').config();


const app = express()
const port = 5000

app.use(express.json())
app.use(cors());


app.use('/api/auth',auth);
app.use('/api/notes',notes);

connectToMongo();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
}) 