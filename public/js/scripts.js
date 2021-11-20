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

const options = [men, women, shirts, jackets, bottoms, shoes, asos, sale, regular, expensive];

const isChecked = (filter) => {
    if (filter[0].checked) {
        return true;
    } else {
        return false;
    }
}

const formSubmitHandler = (filterList) => {
    // const dataObj = {
    //     gender: [],
    //     product_type: [],
    //     brand_name: [],
    //     price: [],
    // }
    // filterList.forEach((filter) => {
        
    // });
    fetch('/api/products/', {
        method: "GET",
        // headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json"
        // },
        // body: JSON.stringify()
    })
};

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
    });
});