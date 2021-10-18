
    let topNewsDiv = document.getElementById("topNews");

    let search = document.getElementsByTagName("input");

    let srchbar = document.getElementById("srchbr");



async function topHeadlines() {
    let res = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=41df10e75cfe491aa09990dfa9c766f3");
    let data = await res.json();
    let newsList = data.articles;
    console.log(newsList);
    newsList.forEach(news => {
        let nDiv = document.createElement("div");
        nDiv.setAttribute("class", "gridView");
        let aDiv = document.createElement("div");
        let dDiv = document.createElement("div");
        let imgDiv = document.createElement("div");
        let title = document.createElement("h2");
        title.textContent = news.title;
        let author = document.createElement("p");
        author.textContent = news.author;
        let publishedAt = document.createElement("p");
        publishedAt.textContent = news.publishedAt;
        aDiv.append(title, author, publishedAt);
        let description = document.createElement("p");
        description.textContent = news.description;
        let image = document.createElement("img");
        image.src = news.urlToImage;
        imgDiv.append(image);
        dDiv.append(description);
        nDiv.append(aDiv, dDiv, imgDiv);
        nDiv.style.marginBottom = "20px";
        nDiv.onclick = () => {
            goToDetails(news);
        }
        topNewsDiv.append(nDiv);
    });
}

topHeadlines();


function goToDetails(news) {
    let link = news.url;
    localStorage.setItem("newsonclick", JSON.stringify(link));
    window.location.href = "news.html";
} 


function goToDetails2(news) {
    let link = news.url;
    localStorage.setItem("newsonsearch", JSON.stringify(link));
    window.location.href = "search.html";
} 



async function showSearchedNews() {
    srchbar.innerHTML = null;
    srchbar.style.display = "block";
    let reqNews = search[0].value;
    let reslt = await fetch(`https://newsapi.org/v2/everything?q=${reqNews}&from=2021-10-18&sortBy=popularity&apiKey=41df10e75cfe491aa09990dfa9c766f3`);
    let newsData = await reslt.json();
    console.log("newsdata:", newsData);
    let nws = newsData.articles;
    nws.forEach((n) => {
        let nDiv = document.createElement("div");
        let imgdiv = document.createElement("div");
        let image = document.createElement("img");
        nDiv.setAttribute("class", "srchgrid")
        image.src = n.urlToImage;
        image.style.height = "60%";
        imgdiv.append(image);
        let titleDiv = document.createElement("div");
        let title = document.createElement("h4");
        title.textContent = n.title;
        titleDiv.style.textAlign = "top";
        titleDiv.append(title);
        nDiv.style.width = "100%";
        nDiv.style.height = "70px";
        nDiv.style.marginBottom = "10px";
        nDiv.append(imgdiv, titleDiv);
        nDiv.onclick = () => {
            goToDetails2(n);
        }
        srchbar.append(nDiv);

    });
}

