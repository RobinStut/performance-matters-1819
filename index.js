const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const EventEmitter = require("events");
const app = express();
const port = 3000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// express.use
app.use(express.static("static"));

//express.set(view engine = ejs)
app.set("view engine", "ejs");

function datafetch(search) {
  // console.log("17 " + search);
  return fetch(
    "https://raw.githubusercontent.com/sterrevangeest/performance-matters-1819/master/static/resultsshort.json"
  )
    .then(res => res.json())
    .then(data => {
      //console.log(data);
      let data2 = data;
      return data2;
    });
}

// app.get("/", datafetch);
app.get("/", (req, res) =>
  res.render("pages/lijstSamenstellen", {
    data: "data.data"
  })
);
app.post("/", function(req, res) {
  var search = req.body.search;
  // console.log("Search value ", search);
  var dataGet = datafetch(search);
  dataGet.then(function(res) {
    // console.log("res" + res);
    var data = res.data;

    var datamap = data.map(function(item) {
      var titleSplit = item.title.split(" ");
      // console.log(titleSplit);
      titleSplit.includes(search);
      if (titleSplit.includes(search) === true) {
        // console.log(item);
        return item;
      } else {
        return;
      }
    });
    console.log(datamap.filter(valueCheck));

    function valueCheck(value) {
      return value !== undefined;
    }
  });
});

// console.log(search);
// res.send(search);
// app.get("/", datafetch);
// });

app.get("/login", (req, res) => res.render("pages/login"));
app.get("/patientOverview", (req, res) => res.render("pages/patientOverview"));
app.get("/patientVanMaatje", (req, res) =>
  res.render("pages/patientVanMaatje")
);
app.get("/maatjeVanPatient", (req, res) =>
  res.render("pages/maatjeVanPatient")
);
app.get("/lijstSamenstellen", (req, res) =>
  res.render("pages/lijstSamenstellen")
);
app.get("/login", (req, res) => res.render("pages/maatjeOverview"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
