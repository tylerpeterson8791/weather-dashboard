//Event Listner for searchbtn
//  fetch from lat/long api
//  make into a variable (lets say latLon)
//      use latlon to do a fetch from the 5Day api
//          convert pertinent data into variables
//              push those variables to populate in html into appropriate fields
//                  3HR BLOCK ON 5DAY - Need to figure out how to target appropriate dayblocks for 5Day Display
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
        .then(weatherData => {
            // Log the results to check if it's working
            console.log(weatherData)
        })
})