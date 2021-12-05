// gender
const men = $("#men");
const women = $("#women");
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
// price
const sale = $("#49");
const regular = $("#99");
const expensive = $("#100");
// form
const filterForm = $("#filter-form");
const formBtn = $("#form-submit");
// products display
const productEl = $("#products");

// line break
const lineBreak = "<br>";

const options = [
  men,
  women,
  shirts,
  jackets,
  bottoms,
  shoes,
  asos,
  vans,
  nike,
  lacoste,
  sale,
  regular,
  expensive,
];

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
  (productImg = $("<img>").attr("src", `https://${data.product_image_url}`)),
    (productID = data.id);

  const imgContainer = $("<div>").addClass("img-container").append(productImg);

  // button
  const button = $("<a>")
    .addClass("btn btn-secondary mx-auto product-button")
    .attr("href", `/${productID}`)
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
    .addClass("card m-3")
    .append(
      $("<div>")
        .addClass("row")
        .append(
          $("<div>").addClass("col-xs-12 col-sm-6").append(imgContainer),
          $("<div>").addClass("col-xs-12 col-sm-6").append(cardBody)
        )
    );

  productEl.append(card);
};

const genders = ["men", "women"];
const productType = ["shirts", "jackets", "bottoms", "shoes"];
const brandName = ["asos", "vans", "nike", "lacoste"];

async function search(finalFilter) {
  const dataObj = {
    //gender: finalFilter.filter((str) => genders.includes(str)), //['women']
    //product_type: finalFilter.filter((str) => productType.includes(str)),
    brand_name: finalFilter.filter((str) => brandName.includes(str)), //['ASOS']
  };

  if (dataObj) {
    const filterFetchResponse = await fetch("/api/searchByFilter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    });

    if (filterFetchResponse.ok) {
      showProduct(filterFetchResponse);
      console.log(dataObj);
      console.log(filterFetchResponse);
    } else {
      console.log("None found");
    }
  }
}

formBtn.on("click", (event) => {
  event.preventDefault();
  const finalFilter = [];
  options.forEach((filter) => {
    if (isSelected(filter)) {
      finalFilter.push(filter[0].id);
    }
  });
  //console.log(finalFilter);

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
