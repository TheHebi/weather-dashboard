// when search button is clicked grab results from the api for the city
// when search button is clicked grab 5 day forcast for city from the api
// save previous searches to local storage
// previous searches create a button that can run api function

// gloabalvars
var apiKey = `89ccc6e1a0a469bc77ebd2c54993b60a`;
var history = [];

function getWeather(event) {
  event.preventDefault();
  var cityName = $("#inputCity").val();
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
  )
    .then(function (data) {
      return data.json();
    })
    // current weather forecast
    .then(function (data) {
      console.log(data);
      $("#cityName").text(`${data.name} ${moment().format("MM/DD/YYYY")}`);
      $("#currentIcon").attr(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
      $("#currentIcon").removeClass("noDisplay")
      $("#currentTemp").text(`Temp: ${data.main.temp} F`);
      $("#currentWind").text(`Wind ${data.wind.speed} MPH`);
      $("#currentHumid").text(`Humidity: ${data.main.humidity}%`);
      document
        .getElementById("currentBox")
        .setAttribute("class", "border border-dark");
      // get uv index
      var long = data.coord.lon;
      var lat = data.coord.lat;
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=imperial`
      )
        .then(function (data) {
          return data.json();
        })
        .then(function (data) {
          console.log(data);
          console.log(data.daily[0].uvi);
          $("#currentUv").text(`UV Index: ${data.daily[0].uvi}`);
          if (data.daily[0].uvi < 4) {
            $("#currentUv").attr("class", "badge badge-success");
          } else if (data.daily[0].uvi < 8) {
            $("#currentUv").attr("class", "badge badge-warning");
          } else {
            $("#currentUv").attr("class", "badge badge-danger");
          }
          for (let i = 1; i < 6; i++) {
              $(`#icon${[i]}`).attr("src",`http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`);
              $(`#icon${[i]}`).removeClass("noDisplay")
              $(`#temp${[i]}`).text(`Temp: ${data.daily[i].temp.day} F`)
              $(`#wind${[i]}`).text(`Wind: ${data.daily[i].wind_speed} MPH`)
              $(`#humid${[i]}`).text(`Humidity: ${data.daily[i].humidity}%`)
              $(`#uv${[i]}`).text(`UV Index: ${data.daily[i].uvi}`)
              $(`#day${[i]}`).text(moment().add(1,"day").format("MM/DD/YYYY"))
              if (data.daily[i].uvi < 4) {
                  $(`#uv${[i]}`).attr("class", "badge badge-success");
                } else if (data.daily[i].uvi < 8) {
                    $(`#uv${[i]}`).attr("class", "badge badge-warning");
                } else {
                    $(`#uv${[i]}`).attr("class", "badge badge-danger");
                }
                
          }
        });
    });
    // appends previous search to page TODO: keep on page post refresh
  var oldCity = $("<button>");
  $(oldCity).attr("class", "btn btn-secondary w-100 oldCitybtn");
  $(oldCity).text(`${cityName}`);
  $(".formBox").append(oldCity);
  $("#inputCity").val("");
}
$("#submitBtn").on("click", getWeather);
