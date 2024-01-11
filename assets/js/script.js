//Event Listner for searchbtn - DONE
//  fetch from lat/long api - DONE
//  make into a variable (lets say latLon) - DONE
//      use latlon to do a fetch from the 5Day api - DONE
//          convert pertinent data into variables
//              push those variables to populate in html into appropriate fields
//                  3HR BLOCK ON 5DAY - Need to figure out how to target appropriate dayblocks for 5Day Display
//                      Save in local storage as an array in an array
//
//Take latlon and store it so it can be called again for the history buttons
//  commit to local storage
//  figure out how to display the city name on the buttons themselves
//      program button listeners for clicks on those   
//          upon click run the fetch for the 5Day api using stored latlon
//          push variables into appropriate html
//              HOW DO I HANDLE ADDING NEW CITIES AND BUMPING THE LIST. CONTINUOUSLY ADD AND ONLY DISPLAY FIRST 8?  I SMELL AN ARRAY
//
//HOW DID THEY DO THE EMOJI THING??
// Use DayJS to get today's date in the format matching mock-up
var todayDate = dayjs().format('MM/DD/YYYY');
var cityNameProper, todayTemp, todayWind, todayHumidity, todayEmoji;
var day1Temp, day1Wind, day1Humidity, day1Emoji;
var day2Temp, day2Wind, day2Humidity, day2Emoji;
var day3Temp, day3Wind, day3Humidity, day3Emoji;
var day4Temp, day4Wind, day4Humidity, day4Emoji;
var day5Temp, day5Wind, day5Humidity, day5Emoji;
//DECLARE ALL GLOBAL VARIABLES ABOVE


document.getElementById('searchbtn').addEventListener('click', function () {
    // Get the value from the user's text input box
    var cityName = document.querySelector('input').value

    // Make a fetch request to get latitude and longitude using the first API
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=5b26d3ed8c99c503e981069d21d6f31a`)
        /// Use .then calls because of the API delay so it doesn't get ahead of itself
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                // Extract latitude and longitude
                var lat = data[0].lat
                var lon = data[0].lon

                //Check to make sure by logging
                console.log(lat)
                console.log(lon)

                // Make a fetch request to get weather forecast using the second API
                return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=5b26d3ed8c99c503e981069d21d6f31a`)
            } else {
                ///pop alert if city isn't found or input is nonsense
                alert('CITY NOT FOUND')
            }
        })
        .then(response => response.json())
        // Drill down into the weatherData and populate global variables
        .then(weatherData => {
            todayTemp = weatherData.list[0].main.temp_max;
            todayWind = weatherData.list[0].wind.speed;
            todayHumidity = weatherData.list[0].main.humidity;
            todayEmoji = weatherData.list[0].weather[0].main;
            cityNameProper = weatherData.city.name;
            //Convert from Kelvin and Knots.  Fun stuff.  Below have to use the .toFixed(2) in order to limit it to two decimal spaces
            todayTempFarenheit = (todayTemp - 273.15) * 9/5 + 32;
            todayWindMPH = todayWind * 1.15078;
            // Call function
            updateTodayData()
            //NOW DO THE SAME FOR ALL 5 DAYS
            day1Temp = weatherData.list[8].main.temp_max;
            day1Wind = weatherData.list[8].wind.speed;
            day1Humidity = weatherData.list[8].main.humidity;
            day1Emoji = weatherData.list[8].weather[8].main;
            day1TempFarenheit = (day1Temp - 273.15) * 9/5 + 32;
            day1WindMPH = day1Wind * 1.15078;
        })
})

function updateTodayData() {
    // Populate HTML for Today
    $('#now-cde').text(`${cityNameProper}, ${todayDate}, ${todayEmoji}`);
    $('#now-temp').text(`Temp: ${todayTempFarenheit.toFixed(2)} °F`);
    $('#now-wind').text(`Wind: ${todayWindMPH.toFixed(2)} MPH`);
    $('#now-humid').text(`Humidity: ${todayHumidity}%`);
}