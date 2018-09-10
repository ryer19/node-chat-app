const express = require('express');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(publicPath))

app.get('/', () => {

})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})