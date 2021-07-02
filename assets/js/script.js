// when search button is clicked grab results from the api for the city
// when search button is clicked grab 5 day forcast for city from the api
// save previous searches to local storage
// previous searches create a button that can run api function

// gloabalvars
var apiKey = `89ccc6e1a0a469bc77ebd2c54993b60a`;

function getWeather(event){
    event.preventDefault()
    var cityName = $("#inputCity").val()
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`)
    .then(function(data){
        return data.json()
    })
    // current weather forecast
    .then(function(data){
        console.log(data)
        $("#cityName").text(`${data.name} ${moment().format("MM/DD/YYYY")}`)
        var cityUl = $("#cityWeather")
        var dailyIcon = $("<img>")
        var cityTemp = $("<li>").text(`Temp: ${data.main.temp} F`)
        var cityWind = $("<li>").text(`Wind ${data.wind.speed} MPH`)
        var cityHumid = $("<li>").text(`Humidity: ${data.main.humidity}%`)
        $(dailyIcon).attr("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
        cityUl.append(dailyIcon)
        cityUl.append(cityTemp,cityWind,cityHumid)
        document.getElementById("currentBox").setAttribute("class", "border border-dark")
        // get uv index
        var long = data.coord.lon
        var lat = data.coord.lat
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,alerts&appid=${apiKey}`)
                .then(function(data){
                    return data.json()   
                })
                .then(function(data){
                    console.log(data)
                    console.log(data.daily[0].uvi)
                    var cityUv = $("<li>").text(`UV Index: ${data.daily[0].uvi}`)
                    if(data.daily[0].uvi < 4){
                        $(cityUv).attr("class", "badge badge-success")
                    }else if(data.daily[0].uvi < 8){
                        $(cityUv).attr("class", "badge badge-warning")
                    }else{
                        $(cityUv).attr("class", "badge badge-danger")
                    }
                    cityUl.append(cityUv)
        
                })
        
    })
}

$("#submitBtn").on("click", getWeather)