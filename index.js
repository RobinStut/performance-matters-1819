const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const EventEmitter = require("events");
const compression = require("compression");
const findCacheDir = require("find-cache-dir");
const app = express();
const port = 3000;

findCacheDir({ name: "oba" });

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// express.use
app.use(express.static("static"));
app.use(compression());
app.use((req, res, next) => {
  // todo: set cache header to 1 year
  res.setHeader("Cache-Control", "max-age=" + 365 * 24 * 60 * 60);
  next();
});

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
    data: null
  })
);

app.post("/", function(req, res) {
  var search = req.body.search;
  // console.log("Search value ", search);
  var dataGet = datafetch(search);
  dataGet
    .then(function(res2) {
      // console.log("res" + res);
      var data = res2.data;

      return data
        .map(function(item) {
          var titleSplit = item.title.split(" ");
          // console.log(titleSplit);
          titleSplit.includes(search);
          if (titleSplit.includes(search) === true) {
            // console.log(item);
            return item;
          }
        })
        .filter(valueCheck);

      function valueCheck(value) {
        return value !== undefined;
      }
    })
    .then(transformedRes => {
      console.log("62 " + transformedRes);
      res.render("pages/lijstSamenstellen", {
        data: transformedRes
      });
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
