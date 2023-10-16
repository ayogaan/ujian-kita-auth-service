require('dotenv').config();
const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const roleRoutes = require('./routes/roleRoutes')
const authRoutes = require('./routes/authRoutes')

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));
app.use('/api/user', authRoutes);
app.use('/api/role', roleRoutes);

const db = require("./models");
db.sequelize.sync({ force: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})