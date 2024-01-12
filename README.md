# Weather Dashboard

## Description

GIVEN a weather dashboard with form inputs

WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history

WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed

WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

## Usage

The user is presented a text input area and search button where they can enter the name of any city.

Once the search is submitted, the website populates the current weather (if it's cloudy, clear, snow, rain), temperature, wind and humidity as well as that information for a 5-day forecast.

Previously searched cities populate as clickable buttons below the search button for easy access in revisiting previous searches.

## Installation

This one was a start from scratch project.  I did everything in HTML and JS, no internal CSS style sheet, all style and formatting was done with bootstrap.

We used not one but TWO APIs in this project.  The first takes a city name that the user inputs and converts it to latitude and longitude.  Then those values can go into a second fetch for the weather information for the city.

The data from the API was a little unruly so it had to be parsed through.  For example, instead of 5 days of forecasts, one per day, it gives you 40 different forecasts for every 3 hours.  I couldn't figure out a really elegant way to handle this so I simply assigned the correct blocks to each variable.  In the end that worked well but it was a manual process.  Another example is that the wind data came in Knots and temperature in Kelvin.  Once I understood what I was looking at, I was able to set up converters for this.

After this was figured out I just needed to pop my data into HTML to display for the user.  I had to declare a big chunk of global variables to pass the data out of the fetch function.  Once again, not the most elegant and very manual, but now that it's set up it works smoothly.  This took a long time but was fairly straightforward.

By far the most difficult part of this was figuring out how to handle the search history buttons.  There needs to be a limited amount of buttons (I went with 8) but if there's less then the extras are hidden.  Also tricky was getting the most recent search to pop to the top button and bump the rest of them down.  Finally the buttons have to be clickable so when the user clicks them it searches that city.

What I did is save the previous searches to local storage by using the UNSHIFT function which put it in position 0 and bumps the rest back.  I used a for loop limited to 8 (while hiding if less than 8 with an if/else) to update the buttons.

Initially I thought I would store lat and lon and re-run the second Fetch in a seperate function.  However what I ended up doing is, upon click, the name of the city is populated back into the text-box and the search button is automatically pushed.  This works great and bumps the city back to the top of the history.  I have pretty good notes in my code and commit comments so you can follow my logic.

## Outstanding Issues
I'm happy with the end result.  It's functional and easy to use.  It's not the prettiest site, but it does the job.  Here are some smaller extra things I couldn't figure out where if I had more time I'd accomplish (and still may if I revisit this ever):

- I tried popping the emojis in for the weather status (like in the mock-up). I thought I had a smart solution where I convert the status in a function and wrap it around the jQuery call (lines 206-223), but for some reason the HTML only displays the text of the code. If I type the code directly into HTML it shows but not when I pop the same text from JS. So strange. Had to give that one up.

- I wanted to add an event listener for the submit as the Enter key in addition to a click. I looked up some documentation on how to do it and that Enter is Key-13 ect... but I just couldn't wrap my head around how to implement it. This isn't a requirement but after using this site a lot for testing, I found myself naturally hitting Enter so I thought it would be nice to have. With more time I could figure this out I think.

- Currently the History Buttons display the city name as typed by the user regardless of cApiTaL letters. I wanted to use the variable properCityName which is the name pulled from the API instead of user input but couldn't figure it out. Then I thought about forcing the first letter Capitalized and the rest lowercase, but for multiple word cities that wouldn't help either (shout out St. Paul and Des Moines!) so I left it as is. Not a huge deal but it bugs me.

## Credits
Shout out to StackOverflow, my brother Kai, my classmate Joe, Monster Energy Drink and of course Gary for giving me the knowledge, assistance and drive to complete this.
