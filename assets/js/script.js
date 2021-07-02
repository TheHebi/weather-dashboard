// when search button is clicked grab results from the api for the city
// when search button is clicked grab 5 day forcast for city from the api
// save previous searches to local storage
// previous searches create a button that can run api function
var weatherApi = `89ccc6e1a0a469bc77ebd2c54993b60a`
function getWeather(event){
    event.preventDefault()
    var cityName = $("#inputCity").val()
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherApi}&units=imperial`)
    .then(function(data){
        return data.json()
    })
    .then(function(data){
        console.log(data)
        $("#cityName").text(data.name)
        var cityUl = $("#cityWeather")
        var cityTemp = $("<li>").text(`Temp: ${data.main.temp} F`)
        var cityWind = $("<li>").text(`Wind ${data.wind.speed} MPH`)
        var cityHumid = $("<li>").text(data.main.humidity)
        cityUl.append(cityTemp,cityWind,cityHumid)
    })
}

$("#submitBtn").on("click", getWeather)