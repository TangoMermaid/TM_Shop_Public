let products = [];

fetch("../public_data/products.json")
    .then(response => response.json())
    .then(data => {
        products = data;
    });


function findItem() {

    let code = document.getElementById("itemCode").value.toUpperCase();

    let item = products.find(product => product["Item ID"] === code);

    let result = document.getElementById("result");

    if (item) {
        result.innerHTML = `
            <h2>${item["Item ID"]}</h2>
            <p>${item["Category"]}</p>
            <p>${item["Sub-category"]}</p>
            <p>Price: €${item["ESTIMATED selling price, EURO"]}</p>
        `;
    } else {
        result.innerHTML = "Item not found";
    }
}
