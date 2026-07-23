/* ============================================================
   Tango Mermaid Checkout
   Version: Prototype 2
   ============================================================ */


/* ---------- PRODUCTS DATABASE ---------- */

let products = [];

fetch("../public_data/products.json")
    .then(response => response.json())
    .then(data => {

        products = data;

        console.log("Products loaded:", products.length);

    })
    .catch(error => {

        console.error("Cannot load products.json", error);

    });


/* ---------- FUTURE VARIABLES ---------- */

/* ---------- CAMERA ---------- */

let cameraStream = null;

// Basket will be stored here
let basket = [];

// Current discount
let discount = null;

// Current order
let currentOrder = null;

/* ---------- ACTIVATION VEIL ---------- */

const scanButton = document.getElementById("scanButton");
const topVeil = document.getElementById("topVeil");
const bottomVeil = document.getElementById("bottomVeil");

if (scanButton && topVeil && bottomVeil){

    scanButton.addEventListener("click", () => {

        const divider = document.getElementById("divider");

        const dividerBottom =
            divider.offsetTop + divider.offsetHeight;

        topVeil.style.top = "0px";
        topVeil.style.height = dividerBottom + "px";

        const firstRedLine = 844;

        bottomVeil.style.top = firstRedLine + "px";
        bottomVeil.style.bottom = "0";

        topVeil.style.display = "block";
        bottomVeil.style.display = "block";

        document.getElementById("permissionDialog").style.display = "flex";

        document.getElementById("allowCameraButton").onclick = async () => {

    try{

        cameraStream = await navigator.mediaDevices.getUserMedia({

            video:{
                facingMode:"environment"
            }

        });

        const camera = document.createElement("video");

        camera.autoplay = true;

        camera.playsInline = true;

        camera.srcObject = cameraStream;

        camera.style.width = "100%";
        camera.style.height = "100%";
        camera.style.objectFit = "cover";

        const placeholder = document.getElementById("cameraPlaceholder");

        placeholder.innerHTML = "";

        placeholder.appendChild(camera);

        console.log("Camera successfully attached.");

    }

    catch(error){

        console.error(error);
        alert("Camera could not be started.");

    }

};

    });

}

/* ---------- PAGE NAVIGATION ---------- */

const pageUpButton = document.getElementById("pageUpButton");
const pageDownButton = document.getElementById("pageDownButton");

if (pageUpButton){

    pageUpButton.addEventListener("click", () => {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

if (pageDownButton){

    pageDownButton.addEventListener("click", () => {

        window.scrollTo({

            top:document.body.scrollHeight,

            behavior:"smooth"

        });

    });

}


/* ============================================================
   BELOW IS THE OLD PROTOTYPE.
   DO NOT DELETE.
   It will be reused when QR scanning is connected.
   ============================================================ */

/*

const logo_file = "Logo board_Colour_PNG.png";

const compliments = [

    "✨ Treasure found!",

    "💙 Great choice!",

    "🌊 I love your style!",

    "✨ What a lovely find!",

    "💃 This will look wonderful on you!",

    "🌸 Get ready to collect compliments!",

    "🧜 Another beautiful Tango Mermaid piece!"

];


document.getElementById("header").innerHTML = `

    <img src="${logo_file}"

         alt="Tango Mermaid"

         id="logo">

`;


function findItem() {

    let code = document
        .getElementById("itemCode")
        .value
        .toUpperCase();

    let item = products.find(

        product => product["Item ID"] === code

    );

    let result = document.getElementById("result");

    if (item) {

        const compliment =

            compliments[
                Math.floor(
                    Math.random() * compliments.length
                )
            ];

        result.innerHTML = `

            <img
                src="../item_photos/${item["Item ID"]}.jpg"
                alt="${item["Item ID"]}"
                id="productPhoto">

            <h2 class="compliment">

                ${compliment}

            </h2>

            <p>

                <b>Item ID:</b>

                ${item["Item ID"]}

            </p>

            <p>

                <b>Product:</b>

                ${item["Category"]}

            </p>

            <p>

                <b>Description:</b>

                ${item["Sub-category"]}

            </p>

            <p>

                <b>Price:</b>

                €${item["ESTIMATED selling price, EURO"]}

            </p>

            <br>

            <button disabled>

                🛒 Add to basket

            </button>

            <button disabled>

                Continue shopping

            </button>

        `;

    }

    else {

        result.innerHTML = "Item not found";

    }

}

*/
