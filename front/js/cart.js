

let total_quantity = 0;
let total_price = 0;

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


//FORM INFORMATION

    //get the Order button
    const order = document.getElementById("order");
    order.addEventListener("click", function(){

      //Create an object with the info from the form
      let name = document.getElementById("firstName").value;
      let lastname = document.getElementById("lastName").value;
      let addresse = document.getElementById("address").value;
      let city = document.getElementById("city").value;
      let email = document.getElementById("email").value;

      let contact = 
      {
        surname: name,
        lastname: lastname,
        address: addresse,
        city: city,
        email: email
      }
    
      //make sure that all the info are in the form
      if (name == ""){
        alert("Veuillez indiquez votre Prenom svp");
        return;
      }if (lastname == ""){
        alert("Veuillez indiquez votre Nom svp");
        return;
      }if (address == ""){
        alert("Veuillez indiquez votre adresse svp");
        return;
      }if (city == ""){
        alert("Veuillez indiquez votre ville svp");
        return;
      }if (email == ""){
        alert("Veuillez indiquez votre email svp");
        return;
      }else{
      //at the click, push the object contact in the local storage
      let keyorder = "order" + "_" + item_product.idItem;
      localStorage.setItem(keyorder, JSON.stringify(contact));
      }
    });

    // Use the button to redirect the page to the confirmation page 
    const cart__order__form__submit = document.querySelector(".cart__order__form__submit");
    const a = document.createElement("a");
    cart__order__form__submit.appendChild(a);
    a.appendChild(order);
    a.href ="confirmation.html";
    console.log(cart__order__form__submit);



