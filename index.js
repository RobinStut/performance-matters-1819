const express = require('express')
const app = express()
const port = 3000

// express.use
app.use(express.static('static'))

//express.set(view engine = ejs)
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index'))
app.get('/login', (req, res) => res.render('pages/login'))
app.get('/patientOverview', (req, res) => res.render('pages/patientOverview'))
app.get('/patientVanMaatje', (req, res) => res.render('pages/patientVanMaatje'))
app.get('/maatjeVanPatient', (req, res) => res.render('pages/maatjeVanPatient'))
app.get('/lijstSamenstellen', (req, res) => res.render('pages/lijstSamenstellen'))
app.get('/login', (req, res) => res.render('pages/maatjeOverview'))

app.get('/test', (req, res) => res.send('test!'))
app.get('/case/:caseId', (req, res) => {
  res.send(req.params.caseId)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
