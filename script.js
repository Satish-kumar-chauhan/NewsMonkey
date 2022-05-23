const newsBox = document.getElementById("newsContainer");
const headLine = document.getElementById("headline");
const loadderImg = document.getElementById("loadderImg");

let pageNumber = 1;
let itemsPerView = 9;
// loadderImg.style.display = "none";
// Display data function
const getData = async(newsType, itemVisible, pages, newsHeadline) => {
    newsBox.innerHTML = '';
    headLine.innerText = newsHeadline;
    loadderImg.style.display = "flex";
    const data = await fetch(`https://newsapi.org/v2/everything?q=${newsType}&apiKey=5b71fa803be24512b0337072b2bfaf58&pageSize=${itemVisible}&page=${pages}`);
    const dataJson = await data.json();
    dataJson.articles.forEach(news => {
        newsBox.innerHTML += `
        <div class="col-md-4">
            <div class="card">
            <img src=${news.urlToImage ===
                'https://images.readwrite.com/wp-content/uploads/2022/02/Know-Before-Trying-SEO.jpg' ||
              news.urlToImage === null
                ? 'https://assets.entrepreneur.com/content/3x2/2000/1647233376-GettyImages-1153428651.jpg'
                : news.urlToImage} class="card-img-top h-50" alt="...">
            <div class="card-body">
                <h6 class="card-title">${news.title}</h6>
                <p class="card-text">${news.description}</p>
                <a href="#" class="btn btn-primary w-50">View News &rarr;</a>
            </div>
            </div>
        </div>
        `;
    });
    loadderImg.style.display = "none";
}
getData("keyword", `${itemsPerView}`, `${pageNumber}`, "Top Headlines");

// Items per page Event
document.getElementById("pageSelection").addEventListener('change', function() {
    itemsPerView = this.value;
    getData(`${(headLine.innerText).toLowerCase()}`, `${itemsPerView}`, `${pageNumber}`, `${headLine.innerText}`);
});

// Click event on all btns
const btns = document.querySelectorAll(".btns");
btns.forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelector(".btns.active").classList.remove('active');
        btn.classList.add('active');
        if (btn.innerText === 'All') {
            getData("keyword", `${itemsPerView}`, `${pageNumber}`, "Top Headlines");
        } else {
            getData(`${(btn.innerText).toLowerCase()}`, `${itemsPerView}`, `${pageNumber}`, `${btn.innerText}`);
        }
    })
})

// Prev click event
document.getElementById("prevBtn").addEventListener("click", function() {
    if (pageNumber >= 1) {
        document.getElementById("prevBtn").disabled = true;
    }
    pageNumber = pageNumber - 1;
    getData(`${(headLine.innerText).toLowerCase()}`, `${itemsPerView}`, `${pageNumber}`, `${headLine.innerText}`);
})

// Next click event
document.getElementById("nextBtn").addEventListener("click", function() {
    document.getElementById("prevBtn").disabled = false;
    pageNumber = pageNumber + 1;
    getData(`${(headLine.innerText).toLowerCase()}`, `${itemsPerView}`, `${pageNumber}`, `${headLine.innerText}`);
})