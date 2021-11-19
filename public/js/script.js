const productEl = document.getElementById("single-product");
const getProductBtn = document.querySelector("#get-product");

const formSubmitHandler = function (event) {
  event.preventDefault();

  // construct data object
  // const dataObj = {
  //   product_type: [],
  //   brand_name: []
  // }
  // const productObject = {
  //   product_name: 'Wide',
  //   product_type: ['shoes', 'jackets'],
  //   brand_name: ['ASOS DESIGN'],
  //   product_image_url: 'images.asos-media.com/products/asos-design-wide-fit-oxford-1-in-tan-leather-with-toe-cap/12315538-1-tan',
  //   price: 54,
  // };

  // fetch("/api/products/search", {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(productObject),
  // }).then();

  fetch("/api/products/5", {
    method: "GET",
  }).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        //console.log(data);

        //for one product
        // clear old content every time search is performed
        productEl.textContent = "";

        const containerEl = document.createElement("div");
        containerEl.classList =
          "list-item flex-row justify-space-between align-center";

        const productName = data.product_name;
        const titleEl = document.createElement("span");
        titleEl.textContent = productName;

        containerEl.appendChild(titleEl);
        productEl.appendChild(containerEl);

        // for all matching products
        // for (let i = 0; i < data.length; i++) {
        //   // (middle element) create a container for each repo

        // }
      });
    }
  });
};
getProductBtn.addEventListener("click", formSubmitHandler); // use 'click' instead of 'submit' to prevent requirement of JSON Formatting

// function showAll() {}
// showAll();
