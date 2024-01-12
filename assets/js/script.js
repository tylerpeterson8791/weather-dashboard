//I can't figure out how to do the correct city name instead of user inputted name on buttons
//I was going to force capital but that wouldn't help in two word city names, leaving it for now
//
//I can't figure out the emoji thing



// Use DayJS to get today's date in the format matching mock-up
var todayDate = dayjs().format('MM/DD/YYYY');
var day1Date = dayjs().add(1, 'day').format('MM/DD/YYYY');
var day2Date = dayjs().add(2, 'day').format('MM/DD/YYYY');
var day3Date = dayjs().add(3, 'day').format('MM/DD/YYYY');
var day4Date = dayjs().add(4, 'day').format('MM/DD/YYYY');
var day5Date = dayjs().add(5, 'day').format('MM/DD/YYYY');

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
            todayTempFarenheit = (todayTemp - 273.15) * 9 / 5 + 32;
            todayWindMPH = todayWind * 1.15078;
            
            // Call function
            updateTodayData()
            // Save the current search call
            saveSearch(cityName);
            // Update the city buttons call
            updateCityButtons()
            
            //NOW DO THE SAME FOR ALL 5 DAYS
            day1Temp = weatherData.list[8].main.temp_max;
            day1Wind = weatherData.list[8].wind.speed;
            day1Humidity = weatherData.list[8].main.humidity;
            day1Emoji = weatherData.list[8].weather[0].main;
            day1TempFarenheit = (day1Temp - 273.15) * 9 / 5 + 32;
            day1WindMPH = day1Wind * 1.15078;
            updateDay1Data()
            day2Temp = weatherData.list[16].main.temp_max;
            day2Wind = weatherData.list[16].wind.speed;
            day2Humidity = weatherData.list[16].main.humidity;
            day2Emoji = weatherData.list[16].weather[0].main;
            day2TempFarenheit = (day2Temp - 273.15) * 9 / 5 + 32;
            day2WindMPH = day2Wind * 1.15078;
            updateDay2Data()
            day3Temp = weatherData.list[24].main.temp_max;
            day3Wind = weatherData.list[24].wind.speed;
            day3Humidity = weatherData.list[24].main.humidity;
            day3Emoji = weatherData.list[24].weather[0].main;
            day3TempFarenheit = (day3Temp - 273.15) * 9 / 5 + 32;
            day3WindMPH = day3Wind * 1.15078;
            updateDay3Data()
            day4Temp = weatherData.list[31].main.temp_max;
            day4Wind = weatherData.list[31].wind.speed;
            day4Humidity = weatherData.list[31].main.humidity;
            day4Emoji = weatherData.list[31].weather[0].main;
            day4TempFarenheit = (day4Temp - 273.15) * 9 / 5 + 32;
            day4WindMPH = day4Wind * 1.15078;
            updateDay4Data()
            day5Temp = weatherData.list[39].main.temp_max;
            day5Wind = weatherData.list[39].wind.speed;
            day5Humidity = weatherData.list[39].main.humidity;
            day5Emoji = weatherData.list[39].weather[0].main;
            day5TempFarenheit = (day5Temp - 273.15) * 9 / 5 + 32;
            day5WindMPH = day5Wind * 1.15078;
            updateDay5Data()
        })
})

function updateTodayData() {
    // Populate HTML for Today
    $('#now-cde').text(`${cityNameProper}, ${todayDate}, ${todayEmoji}`);
    $('#now-temp').text(`Temp: ${todayTempFarenheit.toFixed(0)} °F`);
    $('#now-wind').text(`Wind: ${todayWindMPH.toFixed(0)} MPH`);
    $('#now-humid').text(`Humidity: ${todayHumidity}%`);

}

function updateDay1Data() {
    $('#day1date').text(`${day1Date}`);
    $('#day1emoji').text(`${day1Emoji}`);
    $('#day1temp').text(`Temp: ${day1TempFarenheit.toFixed(0)} °F`);
    $('#day1wind').text(`Wind: ${day1WindMPH.toFixed(0)} MPH`);
    $('#day1humid').text(`Humidity: ${day1Humidity}%`);
}

function updateDay2Data() {
    $('#day2date').text(`${day2Date}`);
    $('#day2emoji').text(`${day2Emoji}`);
    $('#day2temp').text(`Temp: ${day2TempFarenheit.toFixed(0)} °F`);
    $('#day2wind').text(`Wind: ${day2WindMPH.toFixed(0)} MPH`);
    $('#day2humid').text(`Humidity: ${day2Humidity}%`);
}

function updateDay3Data() {
    $('#day3date').text(`${day3Date}`);
    $('#day3emoji').text(`${day3Emoji}`);
    $('#day3temp').text(`Temp: ${day3TempFarenheit.toFixed(0)} °F`);
    $('#day3wind').text(`Wind: ${day3WindMPH.toFixed(0)} MPH`);
    $('#day3humid').text(`Humidity: ${day3Humidity}%`);
}

function updateDay4Data() {
    $('#day4date').text(`${day4Date}`);
    $('#day4emoji').text(`${day4Emoji}`);
    $('#day4temp').text(`Temp: ${day4TempFarenheit.toFixed(0)} °F`);
    $('#day4wind').text(`Wind: ${day4WindMPH.toFixed(0)} MPH`);
    $('#day4humid').text(`Humidity: ${day4Humidity}%`);
}

function updateDay5Data() {
    $('#day5date').text(`${day5Date}`);
    $('#day5emoji').text(`${day5Emoji}`);
    $('#day5temp').text(`Temp: ${day5TempFarenheit.toFixed(0)} °F`);
    $('#day5wind').text(`Wind: ${day5WindMPH.toFixed(0)} MPH`);
    $('#day5humid').text(`Humidity: ${day5Humidity}%`);
}


function saveSearch(city) {
    // Grab previous searches from local storage or pop in an empty array
    var searches = JSON.parse(localStorage.getItem('searches')) || [];

    // Add the current search to the array
    searches.unshift(city);

    // Store the updated array back to local storage
    localStorage.setItem('searches', JSON.stringify(searches));
}

// Function to update the city buttons with previous searches
function updateCityButtons() {
    // Grab previous searches from local storage
    var searches = JSON.parse(localStorage.getItem('searches')) || [];

    // Display up to 8 previous searches or less if there are fewer
    for (var i = 0; i < 8; i++) {
        //the city button is the id city- with the numbers itterating through
        var cityButton = $(`#city-${i + 1}`);

        if (searches[i]) {
            // If there is a previous search, display the button and set its text
            cityButton.show();
            cityButton.text(searches[i]);
        } else {
            // If there is no previous search, hide the button
            cityButton.hide();
        }
    }
}




// Add click event listeners to city buttons
for (var i = 1; i <= 8; i++) {
    $(`#city-${i}`).on('click', function () {
        // Grab the city name from the button text
        var selectedCity = $(this).text();

        // Pop the name of the previous city into the text field
        $('input').val(selectedCity);

        // Trigger a click event on the search button
        $('#searchbtn').click();
    });
}

//THIS WORKS for converting them (wrap function around variable and post i.e. ${mapWeatherToSymbol(todayEmoji)}) but the HTML only shows the code and not the pic
// When I put the code directly into an empty html field it shows symbol.  I have no idea why it's behaving different so I'm commenting this out until I can figure it out
//
//
// // Convert weather conditions (the emoji outputs) into symbols
// function mapWeatherToSymbol(description) {
//     switch (description.toLowerCase()) {
//         case 'clouds':
//             return '&#9729';
//         case 'clear':
//             return '&#9728';
//         case 'rain':
//             return '&#9748';
//         case 'snow':
//             return '&#9731';
//     }
// }