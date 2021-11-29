
var searchButton = $('#search')

searchButton.on("click", function(){
//    Input of City
        var cityName = $('#city-name').val()
    // Fetching Temp, Wind, Humidity
        var gettingWeather = function(cityName) {
            fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=48b311c4f19922ba7960ce06e7fd7ee4")
                .then(response=>response.json())
                    .then(data=>{
                        console.log(data)
                        // getting weather info from fetch
                        var nameValue = data['name'];
                        var temp = data['main']['temp'];
                        var wind = data['wind']['speed']
                        var humidity = data['main']['humidity']
                        var lon = data['coord']['lon']
                        var lat = data['coord']['lat']
                        // rounding temp and converting to fahrenheit
                        var frTemp = 9/5*(temp - 273) + 32
                        var roundedTemp = frTemp.toFixed(2)

                            // name date and icon
                        // getting date
                        var date = moment().format("l")
                        document.querySelector("#current-location").textContent = nameValue + " " + "(" + date + ")";
                        iconImgEl = document.createElement("img")
                        var iconCode = data["weather"]["0"]["icon"]
                        iconImgEl.src = "http://openweathermap.org/img/w/" + iconCode + ".png"
                        console.log(iconImgEl)
                        document.getElementById("current-location").appendChild(iconImgEl)

                        // setting text on screen to current weather
                        document.querySelector("#current-temp").textContent = "Temp: " + roundedTemp + " °F";
                        document.querySelector("#current-wind").textContent = "Wind: " + wind + " mph";
                        document.querySelector("#current-humidity").textContent = "Humidity: " + humidity + "%";

                            // fetching UV index
                            var getUvIndex = function(lat,lon){
                                
                            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '4&exclude=hourly,daily&appid=48b311c4f19922ba7960ce06e7fd7ee4')
                            .then(response=>response.json())
                            .then(data=>{
                                console.log(data);
                                var UVI = data['current']['uvi']
                                document.querySelector("#uv").textContent = "UV Index: " + UVI + "";
                                console.log("got here")
                            })}       
                            getUvIndex(lon,lat);

                            })
                    


            


    }
        gettingWeather(cityName);


});




