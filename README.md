# Restaurant Finder App

###### -> Name: Arun Bhusri .......->ID: 5680607
###### -> Name: Phornthep Sachdev..->ID: 5680836


###### List of known bugs!
 * UI bug (mid resize is a bit bad)
 * Not as responsive as we wish.
 * Not a bug: failed to add next page feature for querying more than 20
   results per generate.
   
#### Some Procedures
  * Used Google Places for initial get method of restaurants in radius.
  * Used Google Maps to display the markers based on info received from Places.
  * Used Photo_id to get URL for image about website.
  * Also used latitude and longitude from Places to help get timezone and 
     country of the location.

#### And here's brief summary of this project:

```
	This is a restaurant finder app. Restaurant Finder provides an easy way to
  find the best places to eat near you. If you allow it, the app can find the
  nearest restaurants just by using the radius, keyword, latitude and longitude
  that you type in. Once you're done typing in the information, click generate
  and let it work for you!

  Before generating locations:
  -click on map for lat & lng or just enter of your own liking.
  -radius range available 5000m to 50000m inclusive.
  -world button to pan out and select regions with ease

  After clicking generate:
  -Markers in location appear
  -Map centers at lat lng user provided.
  -Hover over marker to reveal their name
  -click on it to display image and address about the place
  -Country and timezone of lat & lng also displays

  Reset Button to clear the fields and restore map to original state.

```


### Stuff used to make this:
 * [timezonedb API](https://timezonedb.com/api)
 * [Google Maps API](https://developers.google.com/maps/)
 * [Google Places API](https://developers.google.com/places/)


Used some custom fonts.
Alot of event listeners.
