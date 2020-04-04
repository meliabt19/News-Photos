
$(document).ready(function() { 

    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }

    var place_id = getUrlVars()["place_id"];

    for (var key in place_id) {
        if (place_id.hasOwnProperty(key)) {
          console.log(key + ": " + place_id[key]);
          $("#details").append('<p>' + key + ' :' + place_id[key] +'</p>');
        }
    }

});
