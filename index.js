const express = require('express')
const app = express()
const port = 3000

// express.use
app.use(express.static('static'))

//express.set(view engine = ejs)
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index'))
app.get('/test', (req, res) => res.send('test!'))
app.get('/case/:caseId', (req, res) => {
  res.send(req.params.caseId)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
