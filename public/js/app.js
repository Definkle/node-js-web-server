console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const uiMessage = document.querySelector("#uiMessage");
const errorResponse = document.querySelector("#errorResponse");

const getWeather = (location) => {
  const url = `http://localhost:3000/weather?address=${location}`;

  fetch(url).then((response) => {
    response.json().then((data) => {
      uiMessage.innerHTML = "";
      errorResponse.innerHTML = "";
      if (data.error) {
        errorResponse.innerHTML = data.error;
      } else {
        uiMessage.innerHTML = `${data.location}<br>${data.forecastResponse}`;
      }
    });
  });
};

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = search.value;

  errorResponse.innerHTML = "";
  uiMessage.innerHTML = "Loading....";

  getWeather(location);
});
