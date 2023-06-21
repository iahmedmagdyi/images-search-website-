const accessKey = "UJrcuPFy4bhdQfcoT3z1izpO1SQGn3xVf6CnyDuZ5zc";
const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".form-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.querySelector(".show-more-btn");

let inputData = "";
let page = 1;
async function searchImages() {
  let inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  const req = await fetch(url);
  const res = await req.json();
  const results = res.results;
  // console.log(results);
  if (page === 1) {
    searchResults.innerHTML = "";
  }
  results.map((resualt) => {
    const wrapperResult = document.createElement("div");
    wrapperResult.classList.add("search-result");
    const Image = document.createElement("img");
    Image.src = resualt.urls.small;
    Image.alt = resualt.alt_description;
    const title = document.createElement("h3");
    title.innerText = resualt.alt_description;
    wrapperResult.appendChild(Image);
    wrapperResult.appendChild(title);
    searchResults.appendChild(wrapperResult);
  });
  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }
}
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener("click", () => {
  searchImages();
});
