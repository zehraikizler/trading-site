// navbar fixed

window.onscroll = function () {
    scrollFunction();
  };
  
  let navbar = document.getElementById("navbar");
  let products = [];
  let basket = [];
  let basketBtns = [];
  let selectedProductID = null;
  let openBasketBtn = document.getElementById("openBasketBtn");
  openBasketBtn.addEventListener("click", () => {
    let totalPrice = 0;
    let ul = document.getElementById("basketList");
    ul.innerHTML = "";
    basket.forEach((prd) => {
      let li = document.createElement("li");
      li.classList.add("list-group-item");
      li.innerHTML =
        prd.title +
        " => " +
        prd.price +
        "$ " +
        `<button class="btn btn-danger float-end delete-basket-item" id="${prd.id}">Sil</button>`;
      totalPrice += prd.price;
      ul.appendChild(li);
    });
    document.getElementById("totalPrice").innerHTML =
      "Toplam Fiyat : " + totalPrice + "$";
  
    let deleteBasketBtns = document.querySelectorAll(".delete-basket-item");
    deleteBasketBtns.forEach((el, index) => {
      el.addEventListener("click", () => {
        basket.splice(index, 1);
        console.log(basket);
        ul.innerHTML = "";
        totalPrice = 0;
        basket.forEach((prd) => {
          let li = document.createElement("li");
          li.classList.add("list-group-item");
          li.innerHTML =
            prd.title +
            " => " +
            prd.price +
            "$ " +
            `<button class="btn btn-danger float-end delete-basket-item" id="${prd.id}">Sil</button>`;
          totalPrice += prd.price;
          ul.appendChild(li);
        });
        document.getElementById("totalPrice").innerHTML =
          "Toplam Fiyat : " + totalPrice + "$";
      });
    });
  });
  
  function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      navbar.style.position = "fixed";
      navbar.style.width = "100%";
      navbar.style.zIndex = "100";
    } else {
      navbar.style.position = "relative";
    }
  }
  
  // Products
  fetch("products.json").then((response) => {
    response.json().then((product) => {
      products = product;
      let productRow = document.querySelector(".product-row");
  
      for (let i = 0; i < 12; i++) {
        let div = document.createElement("div");
        div.classList.add("col-12");
        div.classList.add("col-sm-6");
        div.classList.add("col-lg-4");
        div.classList.add("my-3");
        div.innerHTML = `
                  <div class="card shadow-lg border-0 p-3">
                      <div class="favorite-product position-absolute end-0 me-4 mt-2 bg-white rounded-circle py-1 px-2">
                          <span class="unlike-heart" style="display: block;">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                              </svg>
                          </span>
                          <span class="like-heart" style="display: none;">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                              </svg>
                          </span>
                      </div>
                      <img src="${product[i].img}" class="card-img-top shadow-sm rounded" alt="dress-photo">
                      <div class="card-body">
                          <h5 class="card-title">${product[i].title}</h5>
                          <div class="d-flex justify-content-between mb-4">
                              <span class="card-text">${product[i].description}</span>
                              <span class="card-price text-success fw-bold">${product[i].price}$</span>
                          </div>
                          <div class="d-flex justify-content-between">
                              <button class="btn btn-outline-success details-btn btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                              <button class="btn btn-outline-success basket-btn btn-sm" >Add</button>
                          </div>
                      </div>
                  </div>
                  `;
        basketBtns = document.querySelectorAll(".basket-btn");
        productRow.appendChild(div);
      }
      basketBtns = document.querySelectorAll(".basket-btn");
  
      basketBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
          if (index <= products.length) {
            let selectedProduct = products.filter((prd) => prd.id === index)[0];
            basket.push(selectedProduct);
            document.getElementById("basketCount").innerHTML = basket.length;
          } else {
            let selectedProduct = products.filter(
              (prd) => prd.id === selectedProductID
            )[0];
            basket.push(selectedProduct);
            document.getElementById("basketCount").innerHTML = basket.length;
          }
        });
      });
  
      // like - unlike heart
      let likeHeart = document.querySelectorAll(".like-heart");
      let unlikeHeart = document.querySelectorAll(".unlike-heart");
      unlikeHeart.forEach(function (el, index) {
        el.addEventListener("click", () => {
          unlikeHeart[index].style.display = "none";
          likeHeart[index].style.display = "block";
        });
      });
      likeHeart.forEach(function (el, index) {
        el.addEventListener("click", () => {
          likeHeart[index].style.display = "none";
          unlikeHeart[index].style.display = "block";
        });
      });
  
      // details
      let details = document.querySelectorAll(".details-btn");
      details.forEach(function (el, index) {
        el.addEventListener("click", () => {
          selectedProductID = null;
          let selectedProduct = products.filter((prd) => prd.id === index + 1)[0];
          selectedProductID = selectedProduct.id;
          let modalTitle = document.getElementById("exampleModalLabel");
          modalTitle.innerHTML = selectedProduct.title;
          let modalBody = document.getElementById("modalBody");
          modalBody.innerHTML = selectedProduct.detail;
          let modalPrice = document.getElementById("modalPrice");
          modalPrice.innerHTML = selectedProduct.price + '$';
          let modalImg = document.getElementById("modalImg");
          modalImg.innerHTML = `<img src="${selectedProduct.img}" alt="photo">`
        });
      });
    });
  });
  