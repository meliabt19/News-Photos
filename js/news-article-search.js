let place_info = {};
let places_data = [];

$(document).ready(function(){
    $("form").on('submit', function(event){
        event.preventDefault();
        let query = $("#keywords").val();
        /* Isuses with spaces in the query, fixed with this code. */
        let remove_space = query.replace(/ /g,'-'); 
        /* URL DATE NEEDS TO BE UPDATED, KEY LETS DATA RETRIEVE FROM A MONTH AGO */
        let url = `https://newsapi.org/v2/everything?q=${remove_space}&from=2020-04-04&to=2020-04-04&sortBy=popularity&apiKey=a75938fbed57442696e756c8b556a3e8`;
        if (query !== ""){
            $.ajax({
                url: url,
                method: "GET",
                dataType: "json",
                success: function(news){
                    let output = "";
                    let latesetNews = news.articles;
                    //check if there is any search results, if not, add a container:
                    if ( $('#newsResults').children().length === 0 ) {
                        $('#newsResults').append('<div class="row searchResults">' +
                                                            '<div class="section">' +
                                                                '<div id="place-cards">' +
                                                                '</div>' +
                                                            '</div>' +
                                                          '</div>');
                    }
                    for(var x in latesetNews){

                        addPlaceData(latesetNews.publishedAt, latesetNews[x].title, latesetNews[x].urlToImage, latesetNews[x].description, latesetNews[x].author, latesetNews[x].source.name);

                        output +=`
                            <div class="col s12 m6 searchResults">
                                <div class="card">
                                    <div class="card-image">
                                        <img src="${latesetNews[x].urlToImage}">
                                    </div>
                                    <div class="card-content">
                                        <span class="card-title">${latesetNews[x].title}</span>
                                        <p>${latesetNews[x].description}</p>
                                        <p><strong>By:</strong>${latesetNews[x].author}, ${latesetNews[x].source.name}<p>
                                        <a name="${latesetNews.publishedAt}" onclick="addFavorite(name)" href="#modal1" class="btn waves-effect waves-light blue darken-3 modal-trigger">Add<i class="material-icons right">thumb_up</i></a>
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                    if(output !== ""){
                        $("#place-cards").html(output);
                    }else{
                        /* ADD newsResults to search_form.html */;
                        $("#place-cards").html("<div style='font-size:40px; text-align:center;'><font color='red'>No news results were found for - "+query+" -</font></div><br><br>");
                    }
                },
                error: function(){
                    console.log("error");
                }
            })
        }else{
            console.log("Please enter something");
        }
    });
});


function addPlaceData(id, title, image, description, author, source) {

    place_info = {};

    place_info["place_name"] = id;
    place_info["place_id"] = title;
    place_info["author_ref"] = image;
    place_info["photo_reference"] = description;
    place_info["address"] = author;
    place_info["opening_hours"] = source;

    places_data.push(place_info);

}


function addFavorite(id) {

    //find place id:
    $.each(id, function(index, article) {

        if (id === article.id) {

            //set sessionStorage:
            article = JSON.stringify(article);
            sessionStorage.setItem(id, article);

        }

    });
}
