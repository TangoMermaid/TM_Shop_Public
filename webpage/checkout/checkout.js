/* ============================================================
   Tango Mermaid Checkout
   Version: Prototype 2
   ============================================================ */


/* ---------- PRODUCTS DATABASE ---------- */

let products = [];

fetch("../../products_public/products.json")
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
let basketData = {

    itemCount: 0,

    sum: 0,

    campaign: null,

    discount: 0,

    total: 0

};

function isItemInBasket(itemID){

    return basket.some(item => item.getID() === itemID);

}

function addItemToBasket(item){

    if(isItemInBasket(item.getID())){

        alert("This item is already in your basket.");

        return false;

    }

    basket.push(item);

    calculateBasket();

    refreshUI();

    return true;

}

function calculateBasket(){

    basketData.itemCount = basket.length;

    basketData.sum = 0;

    basket.forEach(item => {

        basketData.sum += item.getPrice();

    });

    basketData.total = basketData.sum - basketData.discount;

}

function refreshUI(){

    /* ---------- TOP BASKET ---------- */

    document.querySelector("#basketSummary .summaryColumn strong").textContent =
        basketData.itemCount;

    document.querySelector("#basketSummary .summaryColumn p:nth-of-type(2)").innerHTML =
        "<b>Sum-up:</b> " +
        basketData.sum.toFixed(2) +
        " €";

    document.querySelector("#basketSummary .totalValue").textContent =
        basketData.total.toFixed(2) +
        " €";

    document.getElementById("checkoutButton").disabled =
        basketData.itemCount === 0;

    console.log(
        "Checkout disabled:",
        document.getElementById("checkoutButton").disabled,
        "Items:",
        basketData.itemCount
    );

    /* ---------- BOTTOM BASKET ---------- */

    document.querySelector("#basketLeft strong").textContent =
        basketData.itemCount;

    document.querySelector("#basketLeft p:nth-of-type(2)").innerHTML =
        "<b>Sum-up:</b> " +
        basketData.sum.toFixed(2) +
        " €";

    document.querySelector("#basketRight strong").textContent =
        basketData.total.toFixed(2) +
        " €";
        const emptyMessage =
    document.querySelector("#basketLower p");

const basketItems =
    document.getElementById("basketItems");


if(basketData.itemCount === 0){

    emptyMessage.style.display = "block";

    basketItems.innerHTML = "";

}

else{

    emptyMessage.style.display = "none";

    basketItems.innerHTML = "";

basket.forEach(item => {

    basketItems.innerHTML += `

    <div class="basketRow">

        <img
            class="basketPhoto"
            src="${item.getPhotoPath()}">

        <div class="basketInfo">

            <div>Item ID: ${item.getID()}</div>

            <div>Product: ${item.getCategory()}</div>

            <div>Description: ${item.getDescription()}</div>

            <div>Price: €${item.getPrice()}</div>

        </div>

        <img
            class="basketDelete"
            data-id="${item.getID()}"
            src="../Page_elements/delete_item.png">

    </div>

    `;

    });

    basketItems.querySelectorAll(".basketDelete").forEach(button => {

        button.onclick = () => {

            basket = basket.filter(item =>
                item.getID() !== button.dataset.id
            );

            calculateBasket();

            refreshUI();

        };

    });

}

}

// Current discount
let discount = null;

// Current order
class Order{

    constructor(){

        this.paymentMethod = "";

        this.discountCode = "";

        this.customerName = "";

        this.email = "";

        this.privacyAccepted = false;

        this.tmClub = false;

    }

}

let currentOrder = new Order();
function validateCheckout(){

    const paymentChosen =
        currentOrder.paymentMethod !== "";

    const nameInput =
        document.getElementById("customerName");

    const emailInput =
        document.getElementById("customerEmail");

    const name =
        nameInput.value
        .trim()
        .replace(/\s+/g, " ");

    const email =
        emailInput.value
        .trim()
        .toLowerCase();


    currentOrder.customerName = name;

    currentOrder.email = email;


    const nameValid =
        isValidName(name);


    const emailValid =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


    const checkboxes =
        document.querySelectorAll(
            "#receiptDetails input[type='checkbox']"
        );


    currentOrder.tmClub =
        checkboxes[0].checked;


    currentOrder.privacyAccepted =
        checkboxes[1].checked;

    console.log({
        basket: basketData.itemCount,
        payment: paymentChosen,
        name: nameValid,
        email: emailValid,
        privacy: currentOrder.privacyAccepted
    });

const payButton =
    document.getElementById("payButton");

payButton.disabled = !(
    basketData.itemCount > 0 &&
    paymentChosen &&
    nameValid &&
    emailValid &&
    currentOrder.privacyAccepted
);

console.log("PAY disabled:", payButton.disabled);

}

const customerNameInput =
    document.getElementById("customerName");

const customerEmailInput =
    document.getElementById("customerEmail");

const paymentSelectTop =
    document.getElementById("paymentSelectTop");

const paymentSelectBottom =
    document.getElementById("paymentSelectBottom");


function updatePaymentMethod(method){

    currentOrder.paymentMethod = method;

    paymentSelectTop.value = method;

    paymentSelectBottom.value = method;

}


paymentSelectTop.addEventListener("change", () => {

    updatePaymentMethod(paymentSelectTop.value);

    validateCheckout();

});


paymentSelectBottom.addEventListener("change", () => {

    updatePaymentMethod(paymentSelectBottom.value);

    validateCheckout();

});

customerNameInput.addEventListener("blur", () => {

    customerNameInput.value =
        normalizeName(customerNameInput.value);

    currentOrder.customerName =
        customerNameInput.value;

});

customerEmailInput.addEventListener("blur", () => {

    customerEmailInput.value =
        normalizeEmail(customerEmailInput.value);

    currentOrder.email =
        customerEmailInput.value;

});

function normalizeName(name){

    return name
        .trim()
        .replace(/\s+/g, " ")
        .toLocaleLowerCase()
        .replace(/(^|\s|-|')\p{L}/gu, letter =>
            letter.toLocaleUpperCase()
        );

}

function normalizeEmail(email){

    return email
        .trim()
        .toLocaleLowerCase();

}

function isValidName(name){

    const words = normalizeName(name).split(" ");

    if(words.length < 2){

        return false;

    }

    return words.every(word => {

        const cleanWord = word.replace(/[-']/g, "");

        return cleanWord.length >= 2;

    });

}

let currentItem = null;
let scanTimeout = null;
let successTimeout = null;
let itemTimeout = null;

class Item{

    constructor(data){

        Object.assign(this, data);

        this.scannedAt = new Date();

        this.quantity = 1;

        this.paid = false;

    }

    getID(){

        return this["Item ID"];

    }

    getPrice(){

        return Number(this["ESTIMATED selling price, EURO"]);

    }

    getCategory(){

        return this["Category"];

    }

    getDescription(){

        return this["Sub-category"];

    }

    getPhotoPath(){

        return "../../item_photos/" +
               this.getID() +
               ".jpg";

    }

}

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
        document.getElementById("backButton").style.display = "block";

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

        document.getElementById("scanButton").style.visibility = "hidden";

        document.getElementById("cameraInstruction").style.display = "block";

        console.log("Camera successfully attached.");

scanTimeout = setTimeout(() => {

    document.getElementById("cameraInstruction").style.display = "none";

    const testScanItems = [

    "TM000001",
    "TM000002",
    "TM000003",
    "TM000004",
    "TM000005"

];


const randomID =
    testScanItems[Math.floor(Math.random() * testScanItems.length)];


currentItem = new Item(findItem(randomID));

    console.log(currentItem);

    showSuccess(currentItem.getID());

    showItemState();

}, 2000);


    }

    catch(error){

        console.error(error);
        alert("Camera could not be started.");

    }

};

    });

}

function startNextScan(){

    document.getElementById("scanItemID").style.display = "none";

    document.getElementById("scanCompliment").style.display = "none";


    document.getElementById("cameraPlaceholder").innerHTML = "";

    document.getElementById("cameraPlaceholder").style.background = "rgba(0,0,0,0.50)";


    document.getElementById("backButton").style.display = "block";


    const camera = document.createElement("video");

    camera.autoplay = true;
    camera.playsInline = true;


    navigator.mediaDevices.getUserMedia({

        video:{
            facingMode:"environment"
        }

    })

    .then(stream => {

        cameraStream = stream;

        camera.srcObject = stream;


        camera.style.width = "100%";
        camera.style.height = "100%";
        camera.style.objectFit = "cover";


        document.getElementById("cameraPlaceholder").appendChild(camera);


        document.getElementById("cameraInstruction").style.display = "block";


        scanTimeout = setTimeout(() => {

            document.getElementById("cameraInstruction").style.display = "none";


            const testScanItems = [

                "TM000001",
                "TM000002",
                "TM000003",
                "TM000004",
                "TM000005"

            ];


            const randomID =
                testScanItems[Math.floor(Math.random() * testScanItems.length)];


            currentItem = new Item(findItem(randomID));


            console.log(currentItem);


            showSuccess(currentItem.getID());

            showItemState();


        }, 2000);


    })

    .catch(error => {

        console.error(error);

        alert("Camera could not be started.");

    });

}

function showSuccess(itemID){

    if(cameraStream){

        cameraStream.getTracks().forEach(track => track.stop());

        cameraStream = null;

    }


    const camera = document.querySelector("#cameraPlaceholder video");

    if(camera){

        camera.remove();

    }


    document.getElementById("cameraPlaceholder").style.background = "white";

    document.getElementById("successID").textContent = itemID;

    document.getElementById("successPanel").style.display = "block";

    document.getElementById("itemPanel").style.display = "none";

    document.getElementById("scanItemID").style.display = "none";

    document.getElementById("scanCompliment").style.display = "none";

    document.getElementById("itemButtons").classList.remove("active");

}

function showItemState(){

    console.log(document.getElementById("itemPanel"));
    document.getElementById("scanItemID").textContent =
        currentItem["Item ID"];

    document.getElementById("itemInfoID").textContent =
    currentItem.getID();

    document.getElementById("itemProduct").textContent =
        "Product: " + currentItem.getCategory();

    document.getElementById("itemDescription").textContent =
        "Description: " + currentItem.getDescription();

    document.getElementById("itemPrice").textContent =
        "Price: €" + currentItem.getPrice();

    document.getElementById("itemPhoto").src =
        currentItem.getPhotoPath();

    successTimeout = setTimeout(() => {

        document.getElementById("successPanel").style.display = "none";

        document.getElementById("scanItemID").style.display = "block";

        document.getElementById("scanCompliment").style.display = "block";

        document.getElementById("itemPanel").style.display = "block";

        document.getElementById("backButton").style.display = "none";

        console.log("Activating itemButtons");

        document.getElementById("itemButtons").classList.add("active");

    }, 2000);

}

function findItem(itemID){

    return products.find(item => item["Item ID"] === itemID);

}

document.getElementById("checkoutButton").onclick = () => {

    document.getElementById("receiptDetails").style.display = "block";

    document.getElementById("payButton").style.display = "block";

    document.getElementById("campaignNote").style.display = "block";

    validateCheckout();

    document.getElementById("receiptDetails").scrollIntoView({

        behavior:"smooth",

        block:"start"

    });

};

document.getElementById("payButton").onclick = () => {

    document.getElementById("checkoutButton").disabled = true;

    document.getElementById("topVeil").style.display = "none";

    document.getElementById("bottomVeil").style.display = "none";

    document.getElementById("payButton").style.display = "none";


    const paymentMask = document.getElementById("paymentMask");

    const paymentArea =
        document.getElementById("paymentArea");


        paymentMask.style.top =
                "-" + (paymentArea.offsetTop + 10) + "px";


    paymentMask.style.height =
        paymentArea.offsetTop + "px";


    paymentMask.style.display = "block";


document.querySelectorAll(
    "#paymentMethodContainer > div"
).forEach(block => {

    block.style.display = "none";

});

const amountText = basketData.total.toFixed(2) + " EUR";

document.querySelectorAll(
    "#paymentMethodContainer .paymentRow p"
).forEach(label => {

    if(label.textContent.trim() === "Amount:"){

        label.nextElementSibling.textContent = amountText;

    }

});

switch(currentOrder.paymentMethod){

    case "Bank transfer":
        document.querySelector(".bankTransferBlock").style.display = "block";
        break;

    case "Mobile Pay":
        document.querySelector(".mobilePayBlock").style.display = "block";
        break;

    case "Siirto":
        document.querySelector(".siirtoBlock").style.display = "block";
        break;

    case "PayPal":
        document.querySelector(".paypalBlock").style.display = "block";
        break;

}

    document.getElementById("paymentDetails").style.display = "block";

    document.getElementById("paymentDetails").scrollIntoView({

        behavior:"smooth",

        block:"start"

    });

document.getElementById("paymentBackButton").onclick = () => {

    document.getElementById("paymentDetails").style.display = "none";

    document.getElementById("paymentMask").style.display = "none";

    document.getElementById("payButton").style.display = "block";

    document.getElementById("checkoutButton").disabled = false;

    document.getElementById("receiptDetails").scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

};

};

document.querySelectorAll(".copyButton").forEach(button => {

    button.addEventListener("click", async () => {

        let value =
            button.previousElementSibling
                  .querySelector("strong")
                  .textContent
                  .trim();

        const label =
            button.previousElementSibling
                  .querySelector("p")
                  .textContent
                  .trim();

        switch(label){

            case "IBAN:":

                value = value.replace(/\s+/g, "");
                break;

            case "Mobile phone:":

                value = value.replace(/\s+/g, "");
                break;

            case "Amount:":

                value = value.replace(/\s*EUR$/i, "").trim();
                break;

        }

        try{

            await navigator.clipboard.writeText(value);

            const originalImage = button.src;

            button.src = "../Page_elements/copy_button_activated.png";

            setTimeout(() => {

                button.src = originalImage;

            }, 800);

            console.log("Copied:", value);

        }

        catch(error){

            console.error(error);

        }

    });

});

document.getElementById("paidButton").onclick = () => {

    document.querySelector(".paymentInstructions").style.display = "none";

    document.querySelector(".paymentHeader").style.display = "none";

    document.querySelectorAll(
        "#paymentMethodContainer > div"
    ).forEach(block => {

        block.style.display = "none";

    });

    document.getElementById("receiptConfirmation").style.display = "block";
    document.getElementById("receiptHeader").style.display = "block";

    document.getElementById("receiptSummary").style.display = "none";
    document.getElementById("paidButton").style.display = "none";
    document.getElementById("completeOrderButton").style.display = "block";
    updateCompleteOrderButton();
    document.getElementById("completeOrderButton").disabled = true;

    document.getElementById("receiptBackButton").style.display = "block";

document.getElementById("paymentBackButton").style.display = "none";
document.getElementById("completeOrderButton").disabled = true;
};

document.getElementById("customerName").addEventListener("input", () => {

    validateCheckout();

});

document.getElementById("customerEmail").addEventListener("input", () => {

    validateCheckout();

});

document.getElementById("receiptEmailConfirm").addEventListener("change", () => {

    updateCompleteOrderButton();

});

document.getElementById("receiptBackButton").onclick = () => {

    document.getElementById("receiptConfirmation").style.display = "none";

    document.getElementById("receiptHeader").style.display = "none";

    document.getElementById("receiptSummary").style.display = "none";

    document.getElementById("receiptCompletedMessage").style.display = "none";

    document.getElementById("completeOrderButton").style.display = "none";

    document.getElementById("receiptBackButton").style.display = "none";

    document.querySelector(".paymentInstructions").style.display = "block";

    document.querySelector(".paymentHeader").style.display = "block";

    switch(currentOrder.paymentMethod){

        case "Bank transfer":
            document.querySelector(".bankTransferBlock").style.display = "block";
            break;

        case "Mobile Pay":
            document.querySelector(".mobilePayBlock").style.display = "block";
            break;

        case "Siirto":
            document.querySelector(".siirtoBlock").style.display = "block";
            break;

        case "PayPal":
            document.querySelector(".paypalBlock").style.display = "block";
            break;

    }

    document.getElementById("paidButton").style.display = "block";

    document.getElementById("paymentBackButton").style.display = "block";

};

document.getElementById("completeOrderButton").style.display = "none";

document.getElementById("receiptBackButton").style.display = "none";

document.getElementById("completeOrderButton").onclick = async () => {

    console.log("COMPLETE ORDER CLICKED");

    const order = {
        cust_name: currentOrder.customerName,
        cust_email: currentOrder.email,
        tm_club: currentOrder.tmClub ? "yes" : "no",
        privacy_accepted: "yes",

        items_IDs: basket.map(item => item.getID()),
        items_count: basketData.itemCount,
        subtotal: basketData.sum,
        campaign: basketData.campaign,
        discount: basketData.discount,
        total: basketData.total,

        pay_method: currentOrder.paymentMethod,

        pay_proof_file:
            receiptFile.files.length > 0
                ? receiptFile.files[0].name
                : ""
    };

    console.log("Sending order:", order);

    try {

        const response = await fetch(
            "/.netlify/functions/create-order",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(order)
            }
        );

        const result = await response.json();

        console.log("Order response:", result);

        if (!response.ok || !result.success) {

            alert("Something went wrong. Please try again.");

            return;

        }

        document.querySelector(".paymentHeader").style.display = "none";

        document.getElementById("receiptHeader").style.display = "block";

        document.querySelector(".receiptHeaderTitle").textContent =
            "THANK YOU!";

        document.getElementById("receiptConfirmation").style.display = "none";

        document.getElementById("receiptCompletedMessage").style.display = "block";

        document.getElementById("paymentDetails").style.background = "white";

        document.getElementById("completeOrderButton").style.display = "none";

        document.getElementById("receiptBackButton").style.display = "none";

    }

    catch (error) {

        console.error("Order submission failed:", error);

        alert("Something went wrong. Please try again.");

    }

};

const receiptFile =
    document.getElementById("receiptFile");

const chooseReceiptButton =
    document.getElementById("chooseReceiptButton");

chooseReceiptButton.onclick = () => {

    receiptFile.click();

};

function updateCompleteOrderButton(){

    const screenshotOK =
        receiptFile.files.length > 0;

    const checkboxOK =
        document.getElementById("receiptEmailConfirm").checked;

    const button =
        document.getElementById("completeOrderButton");

    button.disabled =
        !(screenshotOK && checkboxOK);

}

receiptFile.onchange = () => {
    updateCompleteOrderButton();
    if(receiptFile.files.length === 0) return;

    let fileName =
        receiptFile.files[0].name;

    const dot =
        fileName.lastIndexOf(".");

    if(dot > 0){

        const name =
            fileName.substring(0, dot);

        const extension =
            fileName.substring(dot);

        if(name.length > 15){

            fileName =
                name.substring(0,15) + ".." + extension;

        }

    }else{

        if(fileName.length > 18){

            fileName =
                fileName.substring(0,15) + "...";

        }

    }

    chooseReceiptButton.textContent =
        fileName;

    chooseReceiptButton.style.background =
        "white";

    chooseReceiptButton.style.border =
        "2px solid var(--blue)";

    chooseReceiptButton.style.fontWeight =
        "700";
    
        updateCompleteOrderButton();

};

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

function resetToState0(){

    if(scanTimeout){

        clearTimeout(scanTimeout);

        scanTimeout = null;

    }

    if(successTimeout){

        clearTimeout(successTimeout);

        successTimeout = null;

    }

    if(cameraStream){

        cameraStream.getTracks().forEach(track => track.stop());

        cameraStream = null;

    }

    document.getElementById("cameraPlaceholder").innerHTML = `

        <div id="permissionDialog">

            <p>
                Allow access<br>
                to your camera?
            </p>

            <button id="allowCameraButton">

                SURE!

            </button>

        </div>

    `;

    document.getElementById("cameraPlaceholder").style.background = "rgba(0,0,0,0.50)";
    document.getElementById("successPanel").style.display = "none";
    document.getElementById("itemPanel").style.display = "none";
    document.getElementById("scanItemID").style.display = "none";
    document.getElementById("scanCompliment").style.display = "none";
    document.getElementById("itemButtons").classList.remove("active");
    document.getElementById("permissionDialog").style.display = "none";
    document.getElementById("backButton").style.display = "none";
    document.getElementById("cameraInstruction").style.display = "none";
    document.getElementById("scanButton").style.visibility = "visible";

    topVeil.style.display = "none";
    bottomVeil.style.display = "none";

    document.getElementById("allowCameraButton").onclick = scanButton.onclick;

}

document.getElementById("backButton").onclick = () => {

    resetToState0();

};

document.getElementById("itemBackButton").onclick = () => {

    document.getElementById("backButton").click();

};

document.getElementById("addItemButton").onclick = () => {

    if(addItemToBasket(currentItem)){

        document.getElementById("itemPanel").style.display = "none";

        document.getElementById("itemButtons").classList.remove("active");


        document.getElementById("scanItemID").innerHTML =

            "WELL DONE!<br>" +
            currentItem.getID() +
            "<br>IS NOW IN THE BASKET";


        document.getElementById("scanItemID").style.display = "block";


        document.getElementById("scanCompliment").style.display = "none";


        document.getElementById("backButton").style.display = "block";
        document.getElementById("cameraPlaceholder").style.background =
    "rgba(0,0,0,0.50)";

        document.getElementById("cameraPlaceholder").innerHTML = `

            <div id="permissionDialog">

                <p>
                    Scan next?
                </p>

                <button id="allowCameraButton">

                    NEXT!

                </button>

            </div>

        `;


        document.getElementById("permissionDialog").style.display = "flex";

        document.getElementById("allowCameraButton").onclick = () => {

    startNextScan();

};

    }

};

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
