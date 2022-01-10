// products display
const singleProductEl = $("#single-product");

// show product function 
const showSingleProduct = (data) => {
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
    .addClass("card m-3")
    .append(
      $("<div>")
        .addClass("row")
        .append(
          $("<div>").addClass("col-12 imgCont").append(imgContainer),
          $("<div>").addClass("col-12 textCont").append(cardBody)
        )
    );

  singleProductEl.append(card);
};

$(document).ready(() => {
    const id = document.URL[(document.URL.length - 1)];
    console.log(id);
  fetch(`/api/products/${id}`, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      singleProductEl.text("");
      showSingleProduct(data);
    });
});