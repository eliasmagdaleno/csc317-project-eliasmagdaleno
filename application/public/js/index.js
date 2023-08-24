var url = "https://jsonplaceholder.typicode.com/albums/2/photos";
var photoCount = 0;
function fadeOut(ev) {
  var ele = ev.currentTarget;
  var opacity = 1;
  let timer = setInterval(function () {
    ele.style.opacity = opacity;
    opacity -= 0.1;
    if (opacity <= 0) {
      clearInterval(timer);
      ele.remove();
      photoCount--;
      document.querySelector(".photo-count").textContent = photoCount;
    }
  }, 100);
}
function buildCard(data) {
  var cardDiv = document.createElement("div");
  cardDiv.setAttribute("class", "product-card");

  var imgTag = document.createElement("img");
  imgTag.setAttribute("class", "product-img");
  imgTag.setAttribute("src", data.thumbnailUrl);

  var titleTag = document.createElement("p");
  titleTag.setAttribute("class", "product-title");
  titleTag.appendChild(document.createTextNode(data.title));

  var costTag = document.createElement("p");
  costTag.setAttribute("class", "product-cost");
  costTag.appendChild(document.createTextNode(data.id));

  var productDiv = document.createElement("div");
  productDiv.setAttribute("class", "product-info");

  productDiv.appendChild(titleTag);
  productDiv.appendChild(costTag);

  cardDiv.appendChild(imgTag);
  cardDiv.appendChild(productDiv);

  cardDiv.addEventListener("click", fadeOut);
  photoCount++;
  document.querySelector(".photo-count").textContent = photoCount;
  return cardDiv;
}
async function fetchWithDOMAPI() {
  try {
    var response = await fetch(url);
    var data = await response.json();
    var elements = data.map(buildCard);
    photoCounts = elements.length;
    document.getElementById("product-list").append(...elements);
    document.querySelector(".photo-count").textContent = photoCount;
  } catch (error) {
    console.log(error);
  }
}
fetchWithDOMAPI();
