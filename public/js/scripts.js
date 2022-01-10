// form
const filterForm = $("#filter-form");
const formBtn = $("#form-submit");
// product type
const shirts = $("#shirts");
const jackets = $("#jackets");
const bottoms = $("#bottoms");
const shoes = $("#shoes");
// brand
const asos = $("#ASOS");
const vans = $("#Vans");
const nike = $("#Nike");
const lacoste = $("#Lacoste");
const tedbaker = $("#TedBaker");
// products display
const productEl = $("#products");
// line break
const lineBreak = "<br>";

const options = [
  shirts,
  jackets,
  bottoms,
  shoes,
  asos,
  vans,
  nike,
  lacoste,
  tedbaker
];

const productTypeArr = ["shirts", "jackets", "bottoms", "shoes"];
const brandNameArr = ["ASOS Design", "Vans", "Nike", "Lacoste", "Ted Baker"];

const isSelected = (filter) => {
  if (filter[0].checked) {
    return true;
  } else {
    return false;
  }
};

const showProduct = (data) => {
  // get image, name, brand, product type and price
  const productName = $("<h3>").addClass("card-title").text(data.product_name),
    productType = $("<p>").addClass("card-text").text(data.product_type),
    productBrand = $("<h3>").addClass("card-title").text(data.brand_name),
    productPrice = $("<p>").addClass("card-text").text(data.price);
    (productImg = $("<img>").attr("src", `${data.product_image_url}`)),
    (productID = data.id);

  const imgContainer = $("<div>").addClass("img-container").append(productImg);

  // button
  const button = $("<a>")
    .addClass("btn btn-secondary mx-auto product-button")
    .attr("href", `/product/${productID}`)
    .text("View Product");

  const cardBody = $("<div>")
    .addClass("card-body w-100")
    .append(
      productName,
      productType,
      lineBreak,
      productBrand,
      productPrice,
      lineBreak,
      button
    );
  // create card element
  const card = $("<div>")
    .addClass("card m-3 card-homepage")
    .append(
      $("<div>")
        .addClass("row")
        .append(
          $("<div>").addClass("col-12 imgCont").append(imgContainer),
          $("<div>").addClass("col-12 textCont").append(cardBody)
        )
    );

  productEl.append(card);
};

async function search(finalFilter) {
  const dataObj = {
    product_type: finalFilter.filter((str) => productTypeArr.includes(str)), //['shoes']
    brand_name: finalFilter.filter((str) => brandNameArr.includes(str)), //['ASOS Design']
  };
  if (dataObj) {
    fetch("/api/products/searchByFilter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      data.forEach((product) => showProduct(product));
    })

    // if (filterFetchResponse.ok) {
    //   console.log(filterFetchResponse);
    //   // showProduct(filterFetchResponse);
    // } else {
    //   console.log("None found");
    //   productEl.text("No Products Found!");
    // }
  }
}

formBtn.on("click", (event) => {
  event.preventDefault();
  const finalFilter = [];
  options.forEach((filter) => {
    if (isSelected(filter)) {
      finalFilter.push(filter[0].nextSibling.data.trim());
    }
  });
  console.log(finalFilter);

  search(finalFilter);
});

$(document).ready(() => {
  fetch("/api/products", {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      // console.log(data);
      productEl.text("");
      data.forEach((product) => showProduct(product));
    });
});
