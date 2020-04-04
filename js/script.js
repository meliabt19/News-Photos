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
            keywords_list = keywords_list.toString().trim();
            console.log("keywords_list " + keywords_list);
        } 

        //get type input:
        type = $("#place-type-select option:selected").val();
        console.log("type: " + type);

        //get location input:
        location_name = $("#location").val();  
        console.log("location: ", location_name);

        if (location_name === "") {
            getUserLocation();
        }
        else {
            executeSearch();
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
        if (within > 50000) {
            $(this).val(50000);
            $("#within_amt").text(50000 + " meters");
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

function resetVariables() {
    lat = null;
    lng = null;
    within = 0;
    location_name = "";
    keywords_list = "";
    type = "all";
}

function getUserLocation() {

    //HTML5 geolocation - get the user's location:
    var getPosition = function (options) {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
    }
    
    getPosition()
        .then((position) => {
        console.log(position);
        
        //set coords globals:
        lat = position.coords.latitude;
        lng = position.coords.longitude;

        executeSearch();

        })
        .catch((err) => {
            console.error(err.message);
        });

}

function executeSearch() {

    var locationInfo = "";

    if (location_name !== "" && keywords_list !== "") {
        locationInfo = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + location_name + '&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating,geometry&key=' + PLACES_API_KEY;
        searchLocation(locationInfo);
    }

    if (location_name === "" && keywords_list !== "") {
        findPlaces();
    }

    if (keywords_list === "" && location_name !== "") {
        locationInfo = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + location_name + '&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating,geometry&key=' + PLACES_API_KEY;
        searchLocation(locationInfo);
    }

    if (keywords_list === "" && location_name === "") {
        findPlaces();
    }

}

function searchLocation(placeInfo) {

    $.ajax({
        url: placeInfo,
        method: "GET",
        success: sendLocationInfoResponse,
        error: function() {
            //ajax call failed:
            alert('Error!');
        }
    });  

}

function sendLocationInfoResponse(response) {

    console.log("response: ", response);  

    //get place name result:
    var place_results_name = response.candidates[0].name;
    console.log('place name: ' + place_results_name);

    //get photo ref:
    var photo_reference = response.candidates[0].photos[0].photo_reference;

    //get author name and link:
    var author_ref = response.candidates[0].photos[0].html_attributions;
    console.log('photo reference: ' + photo_reference);

    //get location results address:
    var address = response.candidates[0].formatted_address;

    //get place latitude:
    lat = response.candidates[0].geometry.location.lat;
    console.log("lat: " + lat);
    //get longitude:
    lng = response.candidates[0].geometry.location.lng;
    console.log("lng: " + lng);    

    findPlaces();

    displayLocationResults(place_results_name, author_ref, photo_reference, address);

}

function findPlaces() {

    var placeLocation = "";

    if (keywords_list !== "" && type !== "all") {
        placeLocation = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lng + '&radius=' + within + '&type=' + type + '&keyword=' + keywords_list + '&key=' + PLACES_API_KEY;
    }

    if (keywords_list === "" && type !== "all") {
        placeLocation = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lng + '&radius=' + within + '&type=' + type + '&key=' + PLACES_API_KEY;
    }

    if (keywords_list !== "" && type === "all") {
        placeLocation = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lng + '&radius=' + within + '&keyword=' + keywords_list + '&key=' + PLACES_API_KEY;
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

function sendPlaceNearbyKeywordDetails(response) {

    if (response.status == "ZERO_RESULTS") {
        $('#search-results').html('<h4>Results Not Found!</h4>');
    }

    console.log("Place Nearby Keyword Details: ", response);

    var places = response.results;

    $.each(places, function(index, place) {

        var place_name = place.name;
        var place_id = place.place_id;
        var address = place.vicinity;
        var open = "";
        var opening_hours = "";

        if (place.opening_hours === undefined) {
            opening_hours = '<span class="fine-text">Status Not Available</span>';
        }
        else {    
            open = place.opening_hours.open_now;
            if (open === true) {
                opening_hours = "Open";
            }
            else {
                opening_hours = "Closed";
            }
        }

        var avg_rating = "";
        if (place.rating === undefined) {
            avg_rating = '<span class="fine-text">Not Available</span>';
        }
        else {
            avg_rating = place.rating;
        }

        var type_categories = place.types;

        if (place.photos !== undefined) {
            var photo_reference = place.photos[0].photo_reference;
            var author_ref = place.photos[0].html_attributions[0];
        }
        else {
            photo_reference = '';
            author_ref = '';
        }
        displayPlaceResults(place_name, place_id, author_ref, photo_reference, address, opening_hours, avg_rating, type_categories);
    });
    resetVariables();
}

function displayLocationResults(place_name, author_ref, photo_reference, address) {

    if (photo_reference !== '') {
        var photo = '<img src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + photo_reference + '&key=' + PLACES_API_KEY + '" alt="' + place_name + '">';
    }
    else {
        var photo = '<p class="fine-text">Place Image Not Available</p>';
    }

    $('#search-results').prepend('<h4>' + place_name + '</h4>' +
                                '<h6>' + address + '</h6>' +
                                 photo +
                                '<p>Photo by: ' + author_ref + '</p>');
}

function displayPlaceResults(place_name, place_id, author_ref, photo_reference, address, opening_hours, avg_rating, type_categories) {

    var categories = "";

    $.each(type_categories, function(index, category) {
        if (index !== type_categories.length - 1) {
            categories += category + ", ";
        }
        else {
            categories += category;
        }
    });

    if (photo_reference !== "") {
        var photo = '<img src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + photo_reference + '&key=' + PLACES_API_KEY + '" alt="' + place_name + '">';
        var author = '<p class="fine-text">Photo by: ' + author_ref + '</p>';
    }
    else {
        var photo = '<p class="fine-text">Place Image Not Available</p>';
        var author = '<p class="fine-text">Author not available</p>'
    }

        $('#search-results').append('<h4>' + place_name + '</h4>' +
                                    '<h6>' + address + '</h6>' +
                                    '<p>Is Currently ' + opening_hours + ' Rating: ' + avg_rating + '<p>' +
                                    photo +
                                    author +
                                    '<p>Type Categories: ' + categories + '</p>' +
  
                                        '<button id="' + place_id + '" onclick="showPhotos(id);" class="btn waves-effect waves-light blue darken-3" type="button" name="action">' +
                                            'Show Photos' +
                                        '</button>'

                                    );
}

function showPhotos(place_id) {
    console.log("place id: " + place_id);
    var placeDetails = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=' + place_id + '&fields=address_component,formatted_address,geometry,icon,name,permanently_closed,photo,place_id,type,url,vicinity,opening_hours,website,price_level,rating,review,user_ratings_total&key=' + PLACES_API_KEY;

    $.ajax({
        url: placeDetails,
        method: "GET",
        success: sendPlacePhotos,
        error: function() {
            //ajax call failed:
            alert('Error!');
        }
    });  
}

function sendPlacePhotos(response) {
    console.log("Place Details: ", response);
    var place = response.result;
    var name = place.name;
    var place_id = place.place_id;
    var photos = place.photos;

    $("#" + place_id).after('<div class="row">' +
                                      '<div class="' + place_id + ' col s12 m12">' +
                                      '</div>' +
                            '</div>');

    $("#" + place_id).attr('onclick', 'hidePhotos(id)').text("HIDE PHOTOS");

    $.each(photos, function(index, photo) {
        var photo_ref = photo.photo_reference;
        var author_ref = photo.html_attributions;

        addPhotos(name, place_id, photo_ref, author_ref);
    });

}

function addPhotos(name, place_id, photo_ref, author_ref) {
    $("." + place_id).append('<div class="card left">' + 
                                '<div class="card-content">' +
                                    '<img src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=225&photoreference=' + photo_ref + '&key=' + PLACES_API_KEY + '" alt="' + name + '">' +
                                    '<div class="card-action">' +
                                        '<p>Photo By: ' + author_ref + '</p>' +
                                    '</div>' +
                                '</div>' +
                            '</div>');
}

function hidePhotos(place_id) {
    $('.' + place_id).remove();
    $("#" + place_id).text("SHOW PHOTOS").attr('onclick', 'showPhotos(id)');
}