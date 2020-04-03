//const NEWS_API_KEY = 'a75938fbed57442696e756c8b556a3e8';
const PLACES_API_KEY = 'AIzaSyA226PQXOi5BSA7kJuRJYQxforZ980b7_s';
//const newsURL = 'http://newsapi.org/v2/everything?q=bitcoin&from=2020-02-29&sortBy=publishedAt&apiKey=' + NEWS_API_KEY;

//my coords:
//lat: 35.69
//lng: -77.94

var place_types = [
                    {value: "airport", text: "Airport"}, {value: "amusement_park", text: "Amusement Park"}, {value: "aquarium", text: "Aquarium"}, {value: "art_gallery", text: "Art Gallery"}, 
                    {value: "atm", text: "ATM"}, {value: "bakery", text: "Bakery"}, {value: "bank", text: "Bank"}, {value: "bar", text: "Bar"}, {value: "beauty_salon", text: "Beauty Salon"},
                    {value: "bicycle_store", text: "Bicycle Store"}, {value: "book_store", text: "Book Store"}, {value: "bowling_alley", text: "Bowling Alley"}, {value: "bus_station", text: "Bus Station"}, {value: "Cafe", text: "Café"}, 
                    {value: "campground", text: "Campground"}, {value: "car_dealer", text: "Car Dealership"}, {value: "car_rental", text: "Car Rental"}, {value: "car_repair", text: "Car Repair"}, {value: "car_wash", text: "Car Wash"},
                    {value: "casino", text: "Casino"}, {value: "cemetery", text: "Cemetery"}, {value: "church", text: "Church"}, {value: "city_hall", text: "City Hall"}, {value: "clothing_store", text: "Clothing Store"}, 
                    {value: "convenience_store", text: "Convenience Store"}, {value: "courthouse", text: "Courthouse"}, {value: "dentist", text: "Dentist"}, {value: "department_store", text: "Department Store"}, {value: "doctor", text: "Doctor"}, 
                    {value: "drugstore", text: "Drug Store"}, {value: "electrician", text: "Electrician"}, {value: "electronics_store", text: "Electronics Store"}, {value: "embassy", text: "Embassy"}, {value: "fire_station", text: "Fire Station"}, 
                    {value: "florist", text: "Florist"}, {value: "funeral_home", text: "Funeral Home"}, {value: "furniture_store", text: "Furniture Store"}, {value: "gas_station", text: "Gas Station"}, {value: "grocery_or_supermarket", text: "Grocery Store or Supermarket"}, 
                    {value: "gym", text: "Gym"}, {value: "hair_care", text: "Hair Care"}, {value: "hardware_store", text: "Hardware Store"}, {value: "hindu_temple", text: "Hindu Temple"}, {value: "home_goods_store", text: "Home Goods Store"}, 
                    {value: "hospital", text: "Hospital"}, {value: "insurance_agency", text: "Insurance Agency"}, {value: "jewelry_store", text: "Jewelry Store"}, {value: "laundry", text: "Laundry"}, {value: "lawyer", text: "Lawyer"}, 
                    {value: "library", text: "Library"}, {value: "light_rail_station", text: "Light Rail Station"}, {value: "liquor_store", text: "Liquor Store"}, {value: "local_government_office", text: "Local Government Office"}, {value: "locksmith", text: "Locksmith"}, 
                    {value: "lodging", text: "Lodging"}, {value: "meal_delivery", text: "Meal Delivery"}, {value: "meal_takeaway", text: "Meal Takeaway"}, {value: "mosque", text: "Mosque"}, {value: "movie_rental", text: "Movie Rental"}, 
                    {value: "movie_theater", text: "Movie Theater"}, {value: "moving_company", text: "Moving Company"}, {value: "museum", text: "Museum"}, {value: "night_club", text: "Night Club"}, {value: "painter", text: "Painter"}, 
                    {value: "park", text: "Park"}, {value: "parking", text: "Parking"}, {value: "pet_store", text: "Pet Store"}, {value: "pharmacy", text: "Pharmacy"}, {value: "physiotherapist", text: "Physiotherapist"},
                    {value: "plumber", text: "Plumber"}, {value: "police", text: "Police"}, {value: "post_office", text: "Post Office"}, {value: "primary_school", text: "Primary School"}, {value: "real_estate_agency", text: "Real Estate Agency"}, 
                    {value: "restaurant", text: "Restaurant"}, {value: "roofing_contractor", text: "Roofing Contractor"}, {value: "rv_park", text: "RV Park"}, {value: "school", text: "School"}, {value: "secondary_school", text: "Secondary School"}, 
                    {value: "shoe_store", text: "Shoe Store"}, {value: "shopping_mall", text: "Shopping Mall"}, {value: "spa", text: "Spa"}, {value: "stadium", text: "Stadium"}, {value: "storage", text: "Storage"},
                    {value: "store", text: "Store"}, {value: "subway_station", text: "Subway Station"}, {value: "supermarket", text: "Supermarket"}, {value: "synagogue", text: "Synagogue"}, {value: "taxi_stand", text: "Taxi Stand"}, 
                    {value: "tourist_attraction", text: "Tourist Attraction"}, {value: "train_station", text: "Train Station"}, {value: "transit_station", text: "Transit Station"}, {value: "travel_agency", text: "Travel Agency"}, {value: "university", text: "University"}, 
                    {value: "veterinary_care", text: "Veterinary Care"}, {value: "zoo", text: "Zoo"}
                ];

var lat = null;
var lng = null;
var within = 0;
var location_name = "";
var keywords_list = "";
var type = "all";

$(document).ready(function() { 

    getUserLocation();

    var category = "";
    var articles = ""
    var sites = "";

    $("#place-type-select").on("change", function() {
        console.log('changed type');
        type = $("#place-type-select").val();
    });

    //insert place type options into select list:
    $.each(place_types, function(index, type) {
        $("#place-type-select").append('<option value="' + type.value + '">' + type.text + '</option>');
    });
    

    $('#search-form').submit(function(event) {
        event.preventDefault();
        console.log('form submitted');

        $("#search-results").empty();

        //get place input:
        var place_name = $("#place_name").val();  
        console.log("place_name: ", place_name);

        //get keyword input:
        keywords_list = $("#keywords").val();
        
        if (place_name !== "") {
            keywords_list += " " + place_name;
        }

        if (keywords_list !== "") {
            //add place name to keywords list:
            keywords_list = keywords_list.split(" ").join("+");
            keywords_list = keywords_list.toString();
            console.log("keywords_list " + keywords_list);
        } 

        //get location input:
        location_name = $("#location").val();  
        console.log("location: ", location_name);

        //get type input:
        type = $("#place-type-select option:selected").val();
        console.log("type: " + type);

        if (location_name !== "" && keywords_list !== "") {
            const locationInfo = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + location_name + '&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating,geometry&key=' + PLACES_API_KEY;
            searchPlaceInfo(locationInfo);
        }
 
        if (location_name === "" && keywords_list !== "") {
            findPlaces();
        }

        if (keywords_list === "" && location_name !== "") {
            const locationInfo = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + location_name + '&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating,geometry&key=' + PLACES_API_KEY;
            searchPlaceInfo(locationInfo);
        }

        if (keywords_list === "" && location_name === "") {
            findPlaces();
        }

    });

    within = $("#radius").val();

    $("#within_amt_text").val(within);

    $("#within_amt").text(within + " meters");

    $("#within_amt_text").on("keyup", function() {
        var radius_input = $(this).val();
        within = parseInt(radius_input);
        $("#radius").val(within);
        $("#within_amt").text(within + " meters");
    })
    
    $("#within_amt_text").on("blur", function() {
        within = $(this).val();
        within = parseInt(within);
        if (within > 100000) {
            $(this).val(100000);
            $("#within_amt").text(10000 + " meters");
        }
        if (within < 500) {
            $(this).val(500);
            $("#within_amt").text(500 + " meters");
        }
    });
    
    $("#radius").on("change", function() {
        within = $(this).val()
        within = parseInt(within);
        $("#within_amt").text(within + " meters");
        $("#within_amt_text").val(within);
    });

});

function getUserLocation() {

    //HTML5 geolocation - get the user's location:
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          //set coords globals:
          lat = pos.lat;
          lng = pos.lng;

        }, function() {
            console.log("Cannot find your location");
        });
      } else {
        // Browser doesn't support Geolocation
        console.log("Your browser does not support Geolocation");
      }

}

function searchPlaceInfo(placeInfo) {

    $.ajax({
        url: placeInfo,
        method: "GET",
        success: sendPlaceInfoResponse,
        error: function() {
            //ajax call failed:
            alert('Error!');
        }
    });  

}

function sendPlaceInfoResponse(response) {

    console.log("response: ", response);  

    //get place name result:
    var place_results_name = response.candidates[0].name;
    console.log('place name: ' + place_results_name);

    //get photo ref:
    var photo_reference = response.candidates[0].photos[0].photo_reference;

    //get author name and link:
    var author_ref = response.candidates[0].photos[0].html_attributions;
    console.log('photo reference: ' + photo_reference);

    //if location is left blank, use the user's geolocation:
    if (location_name !== "") {
        //get latitude:
        lat = response.candidates[0].geometry.location.lat;
        console.log("lat: " + lat);
        //get longitude:
        lng = response.candidates[0].geometry.location.lng;
        console.log("lng: " + lng);
    }
    else {
        //user's geolocation coords used:
        console.log("your lat: " + lat)
        console.log("your lng: " + lng);
    }

    findPlaces();

    getPhotos(place_results_name, author_ref, photo_reference);

}

function findPlaces() {

    var placeLocation;

    if (keywords_list !== "" && type !== "all") {
        placeLocation = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lng + '&radius=' + within + '&type=' + type + '&keyword=' + keywords_list + '&key=' + PLACES_API_KEY;
    }

    if (keywords_list === "" && type !== "all") {
        placeLocation = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lng + '&radius=' + within + '&type=' + type + '&key=' + PLACES_API_KEY;
    }

    if (keywords_list !== "" && type === "all") {
        placeLocation = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lng + '&radius=' + within + '&keyword=' + keywords_list + '&key=' + PLACES_API_KEY;
    }   

    if (keywords_list === "" && type === "all") {
        placeLocation = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lng + '&radius=' + within + '&key=' + PLACES_API_KEY;
    }

    getPlaceNearbyKeywordDetails(placeLocation);

}

function getPlaceNearbyKeywordDetails(placeLocation) {
    $.ajax({
        url: placeLocation,
        method: "GET",
        success: sendPlaceNearbyKeywordDetails,
        error: function() {
            //ajax call failed:
            alert('Error!');
        }
    });  
}

function getPlaceLocationDetails(placeLocation) {
    $.ajax({
        url: placeLocation,
        method: "GET",
        success: sendPlaceLocationDetails,
        error: function() {
            //ajax call failed:
            alert('Error!');
        }
    });  
}

function sendPlaceNearbyKeywordDetails(response) {
    console.log("Place Nearby Keyword Details: ", response);

    var places = response.results;

    $.each(places, function(index, place) {
        //console.log(index + " Place Name: " + place.name);
        //console.log(index + " Place Photo Ref: " + place.photos[0].photo_reference);
        //console.log(index + " Place author Ref: " + place.photos[0].html_attributions[0]);
        var place_name = place.name;
        if (place.photos !== undefined) {
            var photo_reference = place.photos[0].photo_reference;
            var author_ref = place.photos[0].html_attributions[0];
        }
        else {
            photo_reference = "";
            author_ref = "";
        }
        getPhotos(place_name, author_ref, photo_reference);
    });
}

function sendPlaceLocationDetails(response) {
    console.log("Place location Details: ", response);  

    //get results place name:
    var place_name = response.candidates[0].name;

    //get results place photo:
    var photo_reference = response.candidates[0].photos[0].photo_reference;

    //get author attribution link:
    var author_ref = response.candidates[0].photos[0].html_attributions[0];

    getPhotos(place_name, author_ref, photo_reference);
}

function getPhotos(place_name, author_ref, photo_reference) {

    if (photo_reference !== "") {
        var photo = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + photo_reference + '&key=' + PLACES_API_KEY;
        var image = '<img src="' + photo + '" alt="' + place_name + '">'
        author_ref = '<p>Photo by: ' + author_ref + '</p>';
        $('#search-results').append('<h4>' + place_name + '</h4>' +
                                    image +
                                    author_ref);
    }
    else {
        $('#search-results').append('<h4>' + place_name + '</h4>');
    }
}