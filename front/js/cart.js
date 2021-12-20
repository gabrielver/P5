//code to use on the confirmation page to get the order number
if(window.location.href.includes("confirmation.html")) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  //we get back the orderId from the url and display it where it is supposed to appear on our page 
  document.getElementById("orderId").innerHTML = id;
}

//get back the items form the local storage 
Object.keys(localStorage).forEach(function(key) {
    let item_product = JSON.parse(localStorage.getItem(key));
    //get the product info using the API and the item_product.idItem
    fetch("http://localhost:3000/api/products/" +item_product.idItem)
        .then(res => res.json())
        .then(product => {

            item_product.price = product.price;
            //we add the price to the item in the local storage
            localStorage.setItem(key, JSON.stringify(item_product));

            //Create an article
            const item = document.getElementById("cart__items");
            const article = document.createElement("article");
            item.appendChild(article);
            article.classList = "cart__item";
            article.dataset.id = item_product.idItem;
            article.dataset.color = item_product.color;
            article.dataset.key = item_product.idItem + '_' + item_product.color;

            //create a div "cart__item__img" in the article
            const itemImg = document.createElement("div");
            itemImg.className = "cart__item__img";
            article.appendChild(itemImg);

            //image in that div
            const img = document.createElement("img");
            img.src = product.imageUrl;
            img.alt = product.altTxt;
            itemImg.appendChild(img);

            //create a div "cart__item__content" in the article
            const content = document.createElement("div");
            content.classList = "cart__item__content";
            article.appendChild(content);

            //Div "cart__item__content__description" in the previous div
            const desc = document.createElement("div");
            desc.classList = "cart__item__content__description";
            content.appendChild(desc);

            //create h2
            const h2 = document.createElement("h2");
            h2.innerHTML= product.name;
            desc.appendChild(h2)

            //p (color chosen)
            const couleur = document.createElement("p");
            couleur.innerHTML = item_product.color;
            desc.appendChild(couleur);

            //p (42euro)
            const price = document.createElement("p");
            price.innerHTML = product.price +"€";
            desc.appendChild(price);

            // div "cart__item__content__settings"
            const setting = document.createElement("div");
            setting.className = "cart__item__content__settings";
            content.appendChild(setting);

            //div "cart__item__content__settings__quantity"
            const quantity = document.createElement("div");
            quantity.className = "cart__item__content__settings__quantity";
            setting.appendChild(quantity);

            //p (quantity)
            const qte = document.createElement("p");
            qte.innerHTML = "Qté : ";
            quantity.appendChild(qte);

            //input
            const input = document.createElement("input");
            input.classList = "itemQuantity";
            input.name = "itemQuantity";
            input.type = "number";
            input.min = "1";
            input.max = "100";
            input.value = item_product.quantity;
            //we use the dataset (id and color) to target exactly what we need to modify in the localstorage
            input.dataset.key = item_product.idItem + '_' + item_product.color;
            quantity.appendChild(input);
            //when we use the input the change the quantity, it will be updated in the local storage and same for the total price / total quantity
            input.onchange = changeQuantity


            //div "cart__item__content__settings__delete"
            const del = document.createElement("div");
            del.className = "cart__item__content__settings__delete";
            setting.appendChild(del);

            // p (delete)
            const deleteItem = document.createElement("p");
            deleteItem.className = "deleteItem";
            deleteItem.innerHTML = "Supprimer";
            ///we use it to delete the HTML and the corresponding "key" in the local storage
            deleteItem.onclick = deleteRow
            //we use the dataset (id and color) to target exactly what we need to delete in the localstorage
            deleteItem.dataset.key = item_product.idItem + '_' + item_product.color;
            del.appendChild(deleteItem);
            

    });
});

 updateDisplay();
//this will allow us to modify the quantity of an item on the page and in the local storage  
function changeQuantity() {
    const key = this.dataset.key;
    const item = JSON.parse(localStorage.getItem(key));
    item.quantity = parseInt(this.value);
    localStorage.setItem(key, JSON.stringify(item));
    //then we update the total price and total quantity
    updateDisplay();
}
//this function will uptate the total price and total quantity after we change the quantity or if we delete an item
function updateDisplay() {
    let total_quantity = 0;
    let total_price    = 0;
    Object.keys(localStorage).forEach(function(key) {
        let item_product = JSON.parse(localStorage.getItem(key));
        total_quantity += item_product.quantity;
        total_price    += item_product.price * item_product.quantity;
    });


    document.getElementById("totalQuantity").innerHTML  = total_quantity;
    document.getElementById("totalPrice").innerHTML     = total_price;
}
//we use it to delete the HTML and the corresponding "key" in the local storage
function deleteRow() {
    const key = this.dataset.key;
    localStorage.removeItem(key);
    document.querySelector('article[data-key="'+ key +'"').remove();
    //this function will uptate the total price and total quantity after we deleted an item
    updateDisplay();
    alert("Cet article a bien été supprimer de votre panier");
}

//FORM
//create a fonction to disable the submit button
function disableSubmit(disabled) {
    if (disabled) {
        order = document.getElementById("order")
        order.setAttribute("disabled", true);
    } else {
        order = document.getElementById("order")
        order.removeAttribute("disabled");}
  }
  //check the input, if they doesn't contain the right caracter, submit is disable. if not, submit works 
  firstName = document.getElementById("firstName")
  firstName.addEventListener("input", function(e) {
    if (/^[a-z\-_\s]+$/i.test(e.target.value)) {
      e.target.nextElementSibling.innerText = "";
      disableSubmit(false);
    } else {
        e.target.nextElementSibling.innerText = "Ce champs ne doit pas contenir de caractères spéciaux, merci";
      disableSubmit(true);}
  });
//check the input, if they doesn't contain the right caracter, submit is disable. if not, submit works
  lastName = document.getElementById("lastName")
  lastName.addEventListener("input", function(e) {
    if (/^[a-z\-_\s]+$/i.test(e.target.value)) { 
      e.target.nextElementSibling.innerText = "";
      disableSubmit(false);
    } else {
        e.target.nextElementSibling.innerText = "Ce champs ne doit pas contenir de caractères spéciaux, merci";
      disableSubmit(true);}
  });
//check the input, if they doesn't contain the right caracter, submit is disable. if not, submit works
  address = document.getElementById("address")
  address.addEventListener("input", function(e) {
    if (/^[a-z\d\-_\s]+$/i.test(e.target.value)) {
      e.target.nextElementSibling.innerText = "";
      disableSubmit(false);
    } else {
        e.target.nextElementSibling.innerText = "Ce champs ne doit pas contenir de caractères spéciaux, merci";
      disableSubmit(true);}
  });
//check the input, if they doesn't contain the right caracter, submit is disable. if not, submit works
  city = document.getElementById("city")
  city.addEventListener("input", function(e) {
    if (/^[a-z\-_\s]+$/i.test(e.target.value)) {
      e.target.nextElementSibling.innerText = "";
      disableSubmit(false);
    } else {
        e.target.nextElementSibling.innerText = "Ce champs ne doit pas contenir de caractères spéciaux, merci";
      disableSubmit(true);}
  });

  
//make sure to disable the submit button if the inputs are empty
const allInput = document.querySelectorAll("input[type=text]");
allInput.forEach(function (e){
if(e.value === ""){
    disableSubmit(true);
}else{
    disableSubmit(false);}
});

//if there is no products in the local storage, submit is disable
if (localStorage.length == 0) {
    disableSubmit(true);}
 
//If the submit button is enable (the form is right), we use the sent function to send our data to the API
form = document.querySelector(".cart__order__form");
form.addEventListener("submit", send);

//Create a function SEND that will contain the POST
function send(e) {
    e.preventDefault();

    //Create an object with the info from the form
    let firstname = document.getElementById("firstName").value;
    let lastname = document.getElementById("lastName").value;
    let addresse = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("email").value;
    // the object "contact" we are going to send
    let formData =
        {
            firstName: firstname,
            lastName: lastname,
            address: addresse,
            city: city,
            email: email
        };
    //the object "product" that we are going to send
    let products = getProducts();
    let product_ids = [];
    products.forEach(function (product) {
        product_ids.push(product.idItem);
    });
    //the body contain the contact and products objects that we need to send to the API
    let body = {
        contact: formData,
        products: product_ids
    };
    //we use the POST method o send the info
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(body)
    })
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (data) {
        //we get the data back (the orderId that we need should be in it)
        console.log(data.orderId);
        //we use this function to go to the confirmation page while using tge orderId 
        goToConfirmation(data.orderId);
        //We clear the local storage of our odrer
        localStorage.clear();
    })
}

//function to go to the confiramtion page while using the orderId
function goToConfirmation(orderId) {
    window.location.href = "confirmation.html?id=" + orderId;
}
//function we use the get the products and to be able to use them in the function send()
function getProducts() {
    let products = [];
    Object.keys(localStorage).forEach(function (key) {
        let item = JSON.parse(localStorage.getItem(key));
        products.push(item);
    });
    return products;
}





//CHECK THE FORM
// function checkForm(){

// //get all the input by text or required
// const allInput = document.querySelectorAll("input[type=text]");
// allInput.forEach(function (e){
//  //e.required = true;
//   //for each input, we check if the value entered by the buyer is correct
//   e.addEventListener("input", function() {
//     if (/^[a-z\-_\s]+$/i.test(e.value)) {
//     e.nextElementSibling.innerHTML = "";
   
//     return true;
//     //AUTORISER LE BOUTON A ETRE CLICKABLE OU LE FORMULAIRE SE VALIDE 
//     //for the input "address", we allow numbers 
//     }else if(e === address){
//        if (/^[a-z\d\-_\s]+$/i.test(e.value)){
//           e.nextElementSibling.innerHTML = ""; 
         
//           return true;
//         }else{   
//           e.nextElementSibling.innerHTML = "Ce champs ne doit pas contenir de caractères spéciaux, merci";
//           alert("essai encore");
//           return false;}
//           //if the value of the input doesn't match the regex or is null, a message appear  
//     }else {  
//       //LE BOUTTON NE DOIT PAS ETRE CLICKABLE OU EL FORMULAIRE NE SE VALIDE PAS
//     e.nextElementSibling.innerHTML = "Ce champs ne doit pas contenir de caractères spéciaux, merci";
//     alert("essai encore");
//     return false;
//   }
//   });

// });
// }

///////////////////////////////////

//function to check if the form is well completed
// function checkForm(e) {
//     let firstname = document.getElementById("firstName");
//     if (firstname.value == /^[a-z\-_\s]+$/i.test) {
//         document.getElementById("firstNameErrorMsg").innerHTML = "";
//     }else{document.getElementById("firstNameErrorMsg").innerHTML = "Ce champs est obligatoire, merci";}
    

//     let lastName = document.getElementById("lastName");
//     if (lastName.value === "") {
//         document.getElementById("lastNameErrorMsg").innerHTML = "Ce champs est obligatoire, merci";
//     }

//     let address = document.getElementById("address");
//     if (address.value === "") {
//         document.getElementById("addressErrorMsg").innerHTML = "Ce champs est obligatoire, merci";
//     }

//     let city = document.getElementById("city");
//     if (city.value === "") {
//         document.getElementById("cityErrorMsg").innerHTML = "Ce champs est obligatoire, merci";
//     }

//     let email = document.getElementById("email");
//     if (email.value === "") {
//         document.getElementById("emailErrorMsg").innerHTML = "Ce champs est obligatoire, merci";
//     }

// }


  
//   //get all the input by text or required
// const allInput = document.querySelectorAll("input[type=text]");
// allInput.forEach(function (e){

//   e.addEventListener("input", function() {
//     if (/^[a-z\-_\s]+$/i.test(e.value)) {
//     e.nextElementSibling.innerHTML = "";
//     });
// });