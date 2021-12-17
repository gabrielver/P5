//code to use on the confirmation page to get the order number
if(window.location.href.includes("confirmation.html")) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  document.getElementById("orderId").innerHTML = id;


}

//get the local storage back
Object.keys(localStorage).forEach(function(key) {
    let item_product = JSON.parse(localStorage.getItem(key));

    //1. recupère les infos du produit via l'api à l'aide de item_product.idItem
    fetch("http://localhost:3000/api/products/" +item_product.idItem)
        .then(res => res.json())
        .then(product => {

            item_product.price = product.price;
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
            input.dataset.key = item_product.idItem + '_' + item_product.color;
            quantity.appendChild(input);
            input.onchange = changeQuantity


            //div "cart__item__content__settings__delete"
            const del = document.createElement("div");
            del.className = "cart__item__content__settings__delete";
            setting.appendChild(del);

            // p (delete)
            const deleteItem = document.createElement("p");
            deleteItem.className = "deleteItem";
            deleteItem.innerHTML = "Supprimer";
            deleteItem.onclick = deleteRow
            deleteItem.dataset.key = item_product.idItem + '_' + item_product.color;
            del.appendChild(deleteItem);
            

    });
});

updateDisplay();

function changeQuantity() {
    const key = this.dataset.key;
    const item = JSON.parse(localStorage.getItem(key));
    item.quantity = parseInt(this.value);
    localStorage.setItem(key, JSON.stringify(item));

    updateDisplay();
}

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

function deleteRow() {
    const key = this.dataset.key;
    localStorage.removeItem(key);

    document.querySelector('article[data-key="'+ key +'"').remove();
    updateDisplay();
}


//CHECK THE FORM
function checkForm(){
//get all the input by text or required
const allInput = document.querySelectorAll("input[type=text]");
allInput.forEach(function (e){
 //e.required = true;
// if(e.value === ""){
//   e.nextElementSibling.innerHTML = "Ce champs est obligatoire et ne doit pas contenir de caractères spéciaux, merci";}
  //for each input, we check if the value entered by the buyer is correct
  e.addEventListener("input", function() {
    if (/^[a-z\-_\s]+$/i.test(e.value)) {
    e.nextElementSibling.innerHTML = "";
    //AUTORISER LE BOUTON A ETRE CLICKABLE OU LE FORMULAIRE SE VALIDE 
    //for the input "address", we allow numbers 
    }else if(e === address){
       if (/^[a-z\d\-_\s]+$/i.test(e.value)){
          e.nextElementSibling.innerHTML = "";
          
        }else{
          e.nextElementSibling.innerHTML = "Ce champs est obligatoire et ne doit pas contenir de caractères spéciaux, merci";}
          //if the value of the input doesn't match the regex or is null, a message appear  
    }else {
      //LE BOUTTON NE DOIT PAS ETRE CLICKABLE OU EL FORMULAIRE NE SE VALIDE PAS
    e.nextElementSibling.innerHTML = "Ce champs est obligatoire et ne doit pas contenir de caractères spéciaux, merci"
    
  }
  });
});
}




 checkForm();

//on click, check the  form input
 formOrder = document.querySelector("#order");
// console.log(formOrder)
// if(formOrder === null) {
formOrder.addEventListener("click", checkForm);
// }

// form = document.querySelector(".cart__order__form");
// if(form === null) {
//     form.addEventListener("submit", send);
// }
form = document.querySelector(".cart__order__form");
form.addEventListener("submit", send);
/*
let key = "77711f0e466b4ddf953f677d30b0efc9";
console.log('article[data-key="'+ key +'"');
let quantity = document.querySelector('article[data-key="'+ key +'"');
console.log(quantity);*/

//FORM

// //get acces to the products in the local storage


//Create a function SEND that will contain the POST
function send(e) {
    e.preventDefault();

    checkForm();

    //Create an object with the info from the form
    let firstname = document.getElementById("firstName").value;
    let lastname = document.getElementById("lastName").value;
    let addresse = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("email").value;

    let formData =
        {
            firstName: firstname,
            lastName: lastname,
            address: addresse,
            city: city,
            email: email
        };

    let products = getProducts();
    let product_ids = [];
    products.forEach(function (product) {
        product_ids.push(product.idItem);
    });

    let body = {
        contact: formData,
        products: product_ids
    };

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
        console.log(data.orderId);
        goToConfirmation(data.orderId);
        // localStorage.clear();
    })
}

//function to go to the confiramtion page
function goToConfirmation(orderId) {
    window.location.href = "confirmation.html?id=" + orderId;
}

function getProducts() {
    let products = [];
    Object.keys(localStorage).forEach(function (key) {
        let item = JSON.parse(localStorage.getItem(key));
        products.push(item);
    });
    return products;
}

//function to check if the form is well completed
// function checkForm() {
//     let firstname = document.getElementById("firstName");
//     if (firstname.value === "") {
//         document.getElementById("firstNameErrorMsg").innerHTML = "Ce champs est obligatoire, merci";
//     }
    

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





//////////////////////////////////////////////////////////
// allInput.addEventListener("input", function(e) {
//     if (/^\p{L}+$/u.test(e.target.value)) {
//       document.getElementById("firstNameErrorMsg").innerHTML = "";
//     console.log(target)
//   } else {
//     document.getElementById("firstNameErrorMsg").innerHTML = "Ce champs est obligatoire, merci";
    
//   }
// });

////////////////////////////////////////////////////////////////////
// firstname = document.getElementById("firstName");
// firstname.addEventListener("input", function(e) {
//     if (/^\p{L}+$/u.test(e.target.value)) {
//       document.getElementById("firstNameErrorMsg").innerHTML = "";
    
//   } else {
//     document.getElementById("firstNameErrorMsg").innerHTML = "Ce champs est obligatoire, merci";
    
//   }
// });



// let firstname = document.getElementById("firstName");
// firstname.addEventListener("keyup", getRidOfMessage);

// function getRidOfMessage (){
//   let error = document.querySelector("#firstNameErrorMsg");
//  error.innerHTML.remove;
// console.log(error);
// };


// // window.addEventListener("keyup", log);

// function log(event){
//   console.log( event.type );
// }



//getProducts();
// function getOrderId(){
//   fetch("http://localhost:3000/api/products/order")
//     .then(function(res) {
//       if (res.ok) {
//         return res.json();
//       }
//     })
//     .then(function(value) {
//       console.log(value);
//     })
//     .catch(function(err) {
//       // Une erreur est survenue
//     });
// }