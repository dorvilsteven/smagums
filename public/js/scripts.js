const productEl = $("#single-product");
const getProductBtn = $("#get-product");

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

  fetch("/api/products/6", {
    method: "GET",
  }).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        //console.log(data);

        //for one product
        // clear old content every time search is performed
        productEl.text('');

        const containerEl = $("<p></p>");
        containerEl.addClass(
          "list-item flex-row justify-space-between align-center"
        );

        // const productName = data.product_name;
        // const productType = ;
        // const brandName = ;
        // const priceTag = ;
        const titleEl = $("<span></span>");
        titleEl.text(`${data.product_name}
          ${data.product_type}
          ${data.brand_name} 
          ${data.price}`);

        // showImage
        const imageEl = $("<img></img>");
        imageEl.attr('src', `https://${data.product_image_url}`)
        imageEl.appendTo(titleEl)
        
        titleEl.appendTo(containerEl);
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

// function showAll() {}
// showAll();
