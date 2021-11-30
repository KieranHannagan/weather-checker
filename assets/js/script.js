var date = moment().format("l")
var searchButton = $('#search')
var day = ["1","2","3","4","5"]
var storedLocations = []

        // Fetching Temp, Wind, Humidity and UV
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
                    document.querySelector("#current-location").textContent = nameValue + " " + "(" + date + ")";
                    iconImgEl = document.createElement("img")
                    var iconCode = data["weather"]["0"]["icon"]
                    iconImgEl.src = "http://openweathermap.org/img/w/" + iconCode + ".png"
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
                                })
                        // error handling regarding no UV index from API pull
                        .catch(err=> {
                        if(err == "TypeError: Cannot read properties of undefined (reading 'uvi')"){
                            window.alert("There is no UV Index available")

                        }
                    })}       
                        getUvIndex(lon,lat);

                        })
    }
        // populating the  day forecast
    var fiveDayForecast = function(cityName) {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=48b311c4f19922ba7960ce06e7fd7ee4")
        .then(response=>response.json())
            .then(data=>{
                console.log(data);
                // Getting Icons
                iconImgEl = document.createElement("img")
                var iconZero = data["list"][day[0]]["weather"]["0"]["icon"]
                iconImgEl.src = "http://openweathermap.org/img/w/" + iconZero + ".png"
                document.getElementById("icon-0").appendChild(iconImgEl)

                iconImgEl = document.createElement("img")
                var iconOne = data["list"][day[1]]["weather"]["0"]["icon"]
                iconImgEl.src = "http://openweathermap.org/img/w/" + iconOne + ".png"
                document.getElementById("icon-1").appendChild(iconImgEl)

                iconImgEl = document.createElement("img")
                var iconTwo = data["list"][day[2]]["weather"]["0"]["icon"]
                iconImgEl.src = "http://openweathermap.org/img/w/" + iconTwo + ".png"
                document.getElementById("icon-2").appendChild(iconImgEl)

                iconImgEl = document.createElement("img")
                var iconThree = data["list"][day[3]]["weather"]["0"]["icon"]
                iconImgEl.src = "http://openweathermap.org/img/w/" + iconThree + ".png"
                document.getElementById("icon-3").appendChild(iconImgEl)

                iconImgEl = document.createElement("img")
                var iconFour = data["list"][day[4]]["weather"]["0"]["icon"]
                iconImgEl.src = "http://openweathermap.org/img/w/" + iconFour + ".png"
                document.getElementById("icon-4").appendChild(iconImgEl)

                // Getting Temps
                var tempZero = data["list"][day[0]]["main"]["temp"]
                var frTempZero = 9/5*(tempZero - 273) + 32
                var roundedTempZero = frTempZero.toFixed(2)

                var tempOne = data["list"][day[1]]["main"]["temp"]
                var frTempOne = 9/5*(tempOne - 273) + 32
                var roundedTempOne = frTempOne.toFixed(2)

                var tempTwo = data["list"][day[2]]["main"]["temp"]
                var frTempTwo = 9/5*(tempTwo - 273) + 32
                var roundedTempTwo = frTempTwo.toFixed(2)

                var tempThree = data["list"][day[3]]["main"]["temp"]
                var frTempThree = 9/5*(tempThree - 273) + 32
                var roundedTempThree = frTempThree.toFixed(2)

                var tempFour = data["list"][day[4]]["main"]["temp"]
                var frTempFour = 9/5*(tempFour - 273) + 32
                var roundedTempFour = frTempFour.toFixed(2)

                // Getting Winds
                var windZero = data["list"][day[0]]["wind"]["speed"]
                var windOne = data["list"][day[1]]["wind"]["speed"]
                var windTwo = data["list"][day[2]]["wind"]["speed"]
                var windThree = data["list"][day[3]]["wind"]["speed"]
                var windFour = data["list"][day[4]]["wind"]["speed"]
                // Getting humidity 
                var humZero = data["list"][day[0]]["main"]["humidity"]
                var humOne = data["list"][day[1]]["main"]["humidity"]
                var humTwo = data["list"][day[2]]["main"]["humidity"]
                var humThree = data["list"][day[3]]["main"]["humidity"]
                var humFour = data["list"][day[4]]["main"]["humidity"]

                // setting dates
                document.querySelector("#date-0").textContent = moment().add(1, 'days').format("l")
                document.querySelector("#date-1").textContent = moment().add(2, 'days').format("l")
                document.querySelector("#date-2").textContent = moment().add(3, 'days').format("l")
                document.querySelector("#date-3").textContent = moment().add(4, 'days').format("l")
                document.querySelector("#date-4").textContent = moment().add(5, 'days').format("l")

                // Setting temps
                document.querySelector("#temp-0" ).textContent = "Temp: " + roundedTempZero + " °F";
                document.querySelector("#temp-1" ).textContent = "Temp: " + roundedTempOne + " °F";
                document.querySelector("#temp-2" ).textContent = "Temp: " + roundedTempTwo + " °F";
                document.querySelector("#temp-3" ).textContent = "Temp: " + roundedTempThree + " °F";
                document.querySelector("#temp-4" ).textContent = "Temp: " + roundedTempFour + " °F";
                // Setting wind
                document.querySelector("#wind-0").textContent = "Wind: " + windZero + " mph";
                document.querySelector("#wind-1").textContent = "Wind: " + windOne + " mph";
                document.querySelector("#wind-2").textContent = "Wind: " + windTwo + " mph";
                document.querySelector("#wind-3").textContent = "Wind: " + windThree + " mph";
                document.querySelector("#wind-4").textContent = "Wind: " + windFour + " mph";

                // setting humidity
                document.querySelector("#humidity-0").textContent = "Humidity: " + humZero + "%";
                document.querySelector("#humidity-1").textContent = "Humidity: " + humOne + "%";
                document.querySelector("#humidity-2").textContent = "Humidity: " + humTwo + "%";
                document.querySelector("#humidity-3").textContent = "Humidity: " + humThree + "%";
                document.querySelector("#humidity-4").textContent = "Humidity: " + humFour + "%";

            

            })


    }
        
        // clearing old text content
    var clearContent = function() {
        // Current content
        document.querySelector("#current-location").textContent =  "Please Enter a Valid City" ;
        document.querySelector("#current-temp").textContent = "Temp:";
        document.querySelector("#current-wind").textContent = "Wind:";
        document.querySelector("#current-humidity").textContent = "Humidity:";
        document.querySelector("#uv").textContent = "UV Index:";
        // 5 day forecast 
        for (let i = 0; i < day.length; i++) {
            document.getElementById("icon-"+ [i]).textContent = ""
        // }
    }}
    var saveLocation = function(cityName) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=48b311c4f19922ba7960ce06e7fd7ee4").then(function(response) {
            if (response.ok) {
                
        var newButtonEl = document.createElement("input");
        newButtonEl.value = cityName;
        newButtonEl.type = "submit"
        document.getElementById("stored-buttons").appendChild(newButtonEl)
        $(newButtonEl).addClass("btn btn-secondary stored-buttons")
                }
                else {
                    window.alert ("Please Enter a City")
                }
    })}

    // event listener for search button
    searchButton.on("click", function(){
            //    Input of City
        var cityName = $('#city-name').val()
            // error handling
            if(cityName == "") {
                window.alert ("Please Enter a City")
            } else  {
                    clearContent();
                    fiveDayForecast(cityName);
                    gettingWeather(cityName);
                    saveLocation(cityName);
                    


                } 
    });




