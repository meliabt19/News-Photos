//const NEWS_API_KEY = 'a75938fbed57442696e756c8b556a3e8';
const PLACES_API_KEY = 'AIzaSyA226PQXOi5BSA7kJuRJYQxforZ980b7_s';
//const newsURL = 'http://newsapi.org/v2/everything?q=bitcoin&from=2020-02-29&sortBy=publishedAt&apiKey=' + NEWS_API_KEY;

$(document).ready(function() {

    $('#search-form').submit(function(event) {
        event.preventDefault();
        console.log('form submitted');
        var place_name_input = event.target.elements[11].value;
        
        console.log("input: ", place_name_input);

        var returnImg = $("#include_images").prop( "checked" );

        console.log("return image? " + returnImg);

        if (place_name_input !== "" && returnImg === true) {
            const placesPhotosURL = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + place_name_input + '&inputtype=textqueryfields=photos,name,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=' + PLACES_API_KEY;
            searchForPlacePhotos(placesPhotosURL);
        }
        else if (place_name_input !== "") {
            const placesKeywordURL = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + place_name_input + '&inputtype=textquery&fields=name&locationbias=circle:2000@47.6918452,-122.2226413&key=' + PLACES_API_KEY;
            console.log("no images");
            searchForPlaceDetails(placesKeywordURL);

        }
        
    });
        
    
});

function searchForPlacePhotos(urlString) {

    $.ajax({
        url: urlString,
        method: "GET",
        success: sendPlacesPhotoResponse,
        error: function() {
            //ajax call failed:
            alert('Error!');
        }
    });  

}

function sendPlacesPhotoResponse(response) {
    console.log("response: ", response);  
    var place_name = response.candidates[0].name;
    console.log('place name: ' + place_name);

    var photo_reference = response.candidates[0].photos[0].photo_reference;

    var author_ref = response.candidates[0].photos[0].html_attributions;

    console.log('photo reference: ' + photo_reference);

    getPhotos(place_name, author_ref, photo_reference);

}

function getPhotos(place_name, author_ref, photo_reference) {

    var photo = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + photo_reference + '&key=' + PLACES_API_KEY;
    
    $('#search-results').append('<h4>' + place_name + '</h4>' + 
                                '<img src="' + photo + '" alt="' + place_name + '">' +
                                '<p>Photo by: ' + author_ref + '</p>');
}

function searchForPlaceDetails(urlString) {
    $.ajax({
        url: urlString,
        method: "GET",
        success: getPlaceDetails,
        error: function() {
            //ajax call failed:
            alert('Error!');
        }
    });  
}

function getPlaceDetails(response) {
    console.log("Place Details", response)
}