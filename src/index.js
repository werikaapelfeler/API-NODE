const express = require('express')
const bodyParser = require('body-parser')
const { success } = require("consola");

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('./routers/auth')(app)
require('./routers/films')(app)
require('./routers/user')(app)
require('./routers/rating')(app)

app.listen(3000, () =>
    success({ message: `Server started on PORT 3000`, badge: true })
);

