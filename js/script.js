/*
const searchForm = document.querySelector('.searchForm')
const input = document.querySelector('.validate')
const newsList = document.querySelector('.newsList')

searchForm.addEventListener('submit', retrieve)

function retrieve(e) {

    newsList.innerHTML = ''

    e.preventDefault()

    const apiKey = 'a75938fbed57442696e756c8b556a3e8'

    let topic = input.value;

    let url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`

    fetch(url).then((res)=>{
        return res.json()
    }).then((data)=>{
        console.log(data)
        data.articles.forEach(article =>{
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.setAttribute('href', article.url );
            a.setAttribute('target', '_blank' );
            a.textContent = article.title;
            li.appendChild(a);
            newsList.appendChild(li);
        })
    })

}
*/


$(document).ready(function(){
    $("form").on('submit', function(event){
        event.preventDefault();

        let query = $("#place_name").val();

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

                    for(var x in latesetNews){
                        output +=`
                        <br>
                        <div class="row">
                            <div class="col s12 m6 l3">
                                <div class="card"><br>
                                <span class="card-title"><strong><h4 text-align="center">${latesetNews[x].title}</h4></strong></span><br><br>
                                    <div class="card-image">
                                        <img src="${latesetNews[x].urlToImage}">
                                        <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
                                    </div>
                                    <div class="card-content">
                                        <p>${latesetNews[x].description}</p><br>
                                        <p><strong>By: </strong>${latesetNews[x].author}, ${latesetNews[x].source.name}</p><br>
                                        <p><strong>Date: </strong>${latesetNews[x].publishedAt}</P>
                                        <a href="${latesetNews[x].url}" align="center" target="_blank">READ MORE</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br>
                        <br>
                        `;
                    }
                    if(output !== ""){
                        $("#newsResults").html(output);

                    }else{
                        /* ADD newsResults to search_form.html */;
                        $("#newsResults").html("<br><div style='font-size:40px; text-align:center;'><font color='red'>No news results were found for - "+query+" -</font></div><br><br>");
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



/* $("form").on('submit', function(event){
    event.preventDefault();

    let query = $("#place_name").val();

/* URL DATE NEEDS TO BE UPDATED, KEY LETS DATA RETRIEVE FROM A MONTH AGO 

let url = "http://newsapi.org/v2/everything?q="+query+"&from=2020-04-04&to=2020-04-04&sortBy=popularity&apiKey=a75938fbed57442696e756c8b556a3e8";

console.log(url);

});
*/