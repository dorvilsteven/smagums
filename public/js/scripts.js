// gender 
const men = $('#men');
const women = $('#women');
// product type 
const shirts = $('#shirts');
const jackets = $('#jackets');
const bottoms = $('#bottoms');
const shoes = $('#shoes');
// brand 
const asos = $('#ASOS');
// price
const sale = $('#49');
const regular = $('#99');
const expensive = $('#100');
// form
const filterForm = $('#filter-form');
const formBtn = $('#form-submit');
// products display
const productEl = $("#products");

// line break
const lineBreak = '<br>';

const options = [men, women, shirts, jackets, bottoms, shoes, asos, sale, regular, expensive];

const isChecked = (filter) => {
    if (filter[0].checked) {
        return true;
    } else {
        return false;
    }
}

const showProduct = (data) => {
    // get image, name, brand, product type and price 
    const productName = $('<h3>').addClass('card-title').text(data.product_name), 
          productType = $('<p>').addClass('card-text').text(data.product_type), 
          productBrand = $('<h3>').addClass('card-title').text(data.brand_name), 
          productPrice = $('<p>').addClass('card-text').text(data.price)
          productImg = $('<img>').attr('src', `https://${data.product_image_url}`);

    const imgContainer = $('<div>').addClass('img-container').append(productImg);

    const cardBody =  $('<div>').addClass('card-body w-100').append(
        productName,
        productType,
        productBrand,
        productPrice
    );
    // create card element
    const card = $('<div>').addClass('card m-3').append(
        $('<div>').addClass('row').append(
            $('<div>').addClass('col-xs-12 col-sm-6').append(imgContainer),
            $('<div>').addClass('col-xs-12 col-sm-6').append(cardBody)
        )
    );

    productEl.append(card);
};

// const formSubmitHandler = (filterList) => {
//     // // const dataObj = {
//     // //     gender: [],
//     // //     product_type: [],
//     // //     brand_name: [],
//     // //     price: [],
//     // // }

//     // fetch('/api/products/', {
//     //     method: "GET",
//     //     // headers: {
//     //     //     Accept: "application/json",
//     //     //     "Content-Type": "application/json"
//     //     // },
//     //     // body: JSON.stringify()
//     // })
// };

formBtn.on('click', (event) => {
    event.preventDefault();
    const finalFilter = [];
    options.forEach((filter) => {
        if (isChecked(filter)) {
            finalFilter.push(filter[0].id);
        }
    });
    console.log(finalFilter);

});

$(document).ready(() => {
    fetch('/api/products', {
        method: "GET",
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
    }).then((data) => {
        console.log(data);
        productEl.text('');
        data.forEach((product) => showProduct(product));
    });
});