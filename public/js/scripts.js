const productEl = $("#single-product");
const getProductBtn = $("#get-product");

const singleProduct = $("#one-product");
fetch("/api/products/6", {
  method: "GET",
}).then((response) => {
  if (response.ok) {
    response.json().then((data) => {
      console.log(data);

      // clear old content every time search is performed
      productEl.text("");

      const containerEl = $("<p></p>");
      containerEl.addClass(
        "list-item flex-row justify-space-between align-center"
      );

      const productName = data.product_name;
      const productType = data.product_type;
      const brandName = data.brand_name;
      const priceTag = data.price;
      const titleEl = $("<span></span>");
      titleEl.text(`${productName}
        ${productType}
        ${brandName} 
        ${priceTag}`);

      // // showImage
      const imageEl = $("<img></img>");
      const imageUrl = data.product_image_url;
      imageEl.attr("src", `https://${imageUrl}`);

      //go to a single product page
      const linkEl = $("<a></a>");
      // linkEl.attr("href", `/shop/${data.id}`);
      // linkEl.attr("target", "_blank"); //in new page
      // linkEl.appendTo(imageEl);
      // linkEl.on("click", (event) => {
      //   event.preventDefault();

      //   fetch(`/api/products/${data.id}`).then((response) => {
      //     response.json().then((singleProductData) => {
      //       console.log(singleProductData);
      //       // singleProduct.text("");

      //       // const containerEl = $("<p></p>");
      //       // containerEl.addClass(
      //       //   "list-item flex-row justify-space-between align-center"
      //       // );

      //       // const productName = singleProductData.product_name;
      //       // const productType = singleProductData.product_type;
      //       // const brandName = singleProductData.brand_name;
      //       // const priceTag = singleProductData.price;
      //       // const titleEl = $("<span></span>");
      //       // titleEl.text(`${productName}
      //       //   ${productType}
      //       //   ${brandName}
      //       //   ${priceTag}`);

      //       // // showImage
      //       // const imageEl = $("<img></img>");
      //       // const imageUrl = singleProductData.product_image_url;
      //       // imageEl.attr("src", `https://${imageUrl}`);

      //       // imageEl.appendTo(titleEl);
      //       // titleEl.appendTo(containerEl);
      //       // containerEl.appendTo(singleProduct);
      //     });
      //   });
      // });

      imageEl.appendTo(titleEl);

      titleEl.appendTo(containerEl);
      containerEl.appendTo(productEl);
    });
  }
});

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

  fetch("/api/products/4", {
    method: "GET",
  }).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        //console.log(data);

        //for one product
        // clear old content every time search is performed
        productEl.text("");

        const containerEl = $("<p></p>").addClass(
          "list-item flex-row justify-space-between align-center"
        );

        const productName = data.product_name;
        const productType = data.product_type;
        const brandName = data.brand_name;
        const priceTag = data.price;
        const titleEl = $("<span></span>")
          .text(`${productName}`)
          .attr("style", "padding: 10px");
        const typeEl = $("<span>")
          .text(`${productType}`)
          .attr("style", "padding: 10px");
        const brandEl = $("<span>")
          .text(`${brandName}`)
          .attr("style", "padding: 10px");
        const priceEl = $("<span>")
          .text(`Price: $${priceTag}`)
          .attr("style", "padding: 10px");

        // showImage
        const imageEl = $("<img></img>");
        const imageUrl = data.product_image_url;
        imageEl.attr("src", `https://${imageUrl}`);

        imageEl.appendTo(containerEl);

        titleEl.appendTo(containerEl);
        typeEl.appendTo(containerEl);
        brandEl.appendTo(containerEl);
        priceEl.appendTo(containerEl);
        containerEl.appendTo(productEl);

        // for all matching products
        // for (let i = 0; i < data.length; i++) {
        //   // (middle element) create a container for each repo

        // }
      });
    }
  });
};
getProductBtn.on("click", formSubmitHandler);

// show all products when shop page loads
const showAll = (data) => {
  const containerEl = $("<p></p>").addClass(
    "list-item flex-row justify-space-between align-center"
  );

  const productName = data.product_name;
  const productType = data.product_type;
  const brandName = data.brand_name;
  const priceTag = data.price;
  const titleEl = $("<span></span>")
    .text(`${productName}`)
    .attr("style", "padding: 10px");
  const typeEl = $("<span>")
    .text(`${productType}`)
    .attr("style", "padding: 10px");
  const brandEl = $("<span>")
    .text(`${brandName}`)
    .attr("style", "padding: 10px");
  const priceEl = $("<span>")
    .text(`Price: $${priceTag}`)
    .attr("style", "padding: 10px");

  // showImage
  const imageEl = $("<img></img>");
  const imageUrl = data.product_image_url;
  imageEl.attr("src", `https://${imageUrl}`);

  imageEl.appendTo(containerEl);

  titleEl.appendTo(containerEl);
  typeEl.appendTo(containerEl);
  brandEl.appendTo(containerEl);
  priceEl.appendTo(containerEl);
  containerEl.appendTo(productEl);
};

// code from feature/frontend-scripts branch
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
      productEl.text("");
      data.forEach((product) => showAll(product));
    });
});
