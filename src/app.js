const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve.
app.use(express.static(publicDirectory));

app.get("", (request, response) => {
  response.render("index", {
    title: "Weather",
  });
});

app.get("/about", (request, response) => {
  response.render("about", {
    title: "About Me",
  });
});

app.get("/help", (request, response) => {
  response.render("help", {
    title: "Help",
    helpText: "This is the help page.",
  });
});

app.get("/weather", ({ query }, response) => {
  if (!query.address) {
    return response.send({
      error: "You must provided an address.",
    });
  }

  geocode(query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return response.send(error);
    } else {
      forecast(latitude, longitude, (error, forecastResponse) => {
        if (error) {
          return response.send(error);
        }
        response.send({
          ...query,
          title: "Weather",
          name: "Reuben Louis C Jusay",
          location,
          forecastResponse,
          address: query.address,
        });
      });
    }
  });
});

app.get("/products", ({ query }, response) => {
  if (!query.search) {
    return response.send({
      error: "You must provided a search term.",
    });
  }
  response.send(query);
});

app.get("/help/*", (request, response) => {
  response.render("404", {
    title: "404",
    message: "Help article not found.",
  });
});

app.get("*", (request, response) => {
  response.render("404", {
    title: "404",
    message: "Page not found.",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
