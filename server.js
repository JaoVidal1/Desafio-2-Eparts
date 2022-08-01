require('dotenv').config();
const crud = require('./src/app.js');

const port = process.env.PORT;

crud.listen(port, () => {
  console.log('O servidor está online!');
});
