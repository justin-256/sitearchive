fetch("./directory.json")
    .then((response) => response.json())
    .then((json) => update(json))

// add elements to page
function update(f) {
    // format data
    result = []
    for(var i in f.pages) {
        result.push(f.pages[i]);
    }

    // Sort the dates, small to large https://www.cloudhadoop.com/javascript-sort-arraydates/
    let unReversed = result.sort(function(a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    a = unReversed.reverse();
    //makes the main newest pages
    const articleList = [];
    const numArticlesInMain = 5
    for (var i in a.slice( - numArticlesInMain)) {
        // Create anchor element.
        console.log(a[i])
        var div = document.createElement("div");
        appendHtml(div, `<a href="./pgs/${a[i]["directory"]}">${a[i]["title"]}</div>`);
        appendHtml(div, `<p>${a[i]["desc"]}</div>`);

        if (a[i]["cover"] != "") {
            appendHtml(div, `<img class="photo" src="media/${a[i]["album"]}/${a[i]["cover"]}">`)
        }
        appendHtml(div, "<div class=\"break\"></div>");
        articleList.push(div);
    }
    articleDiv = document.getElementById("articles");
    //doing it like this makes everything appear with less delay between
    for (const i of articleList) {
        articleDiv.appendChild(i);
    }

    const linkList = [];
    for (var i in a) {
            // Create anchor element.
            console.log(a[i])
            var div = document.createElement("li");
            appendHtml(div, `<a href="./pgs/${a[i]["directory"]}">${a[i]["title"]}</a>`);
        
            linkList.push(div);
        }
    linksdiv = document.getElementById("myMenu");
    //doing it like this makes everything appear with less delay between
    for (const i of linkList) {
        linksdiv.appendChild(i);
    }
}


function appendHtml(el, str) {
    var div = document.createElement("div");
    div.innerHTML = str;
    while (div.children.length > 0) {
        el.appendChild(div.children[0]);
    }
}

// I stole this from W3Schools: https://www.w3schools.com/howto/howto_js_search_menu.asp
function search() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    ul = document.getElementById("menu");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}