

let total_quantity = 0;
let total_price = 0;

//get the local storage back
Object.keys(localStorage).forEach(function(key) {
    let item_product = JSON.parse(localStorage.getItem(key));
    
  
 //1. recupère les infos du produit via l'api à l'aide de item_product.idItem
  fetch("http://localhost:3000/api/products/" +item_product.idItem)
  .then(res => res.json())
  .then(product => {
    
   
    //3. mettre à jour total_price en ajoutant le prix de chaque ligne du panier avec la formulaire prix de la ligne du panier = prix de l'item * quantité  
    total_quantity = total_quantity + item_product.quantity; 
    document.getElementById("totalQuantity").innerHTML = total_quantity;

    //total_price = ....
    total_price = total_price + product.price * item_product.quantity; 
    document.getElementById("totalPrice").innerHTML = total_price;
    
    
    //Create an article
    const item = document.getElementById("cart__items");
    const article = document.createElement("article");
    item.appendChild(article);
    article.classList = "cart__item";
    article.dataset.id = item_product.idItem;
    article.dataset.color = item_product.color;

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
    quantity.appendChild(input);
    
    
    //div "cart__item__content__settings__delete"
    const del = document.createElement("div");
    del.className = "cart__item__content__settings__delete";
    setting.appendChild(del);

    // p (delete)
    const deleteItem = document.createElement("p");
    deleteItem.className = "deleteItem";
    deleteItem.innerHTML = "Supprimer";
    del.appendChild(deleteItem);


    //MODIFY THE NUMBER OF ITEMS IN THE INPUT
    input.addEventListener('change', function (e) {
      total = e.target
      //change the corresponding value in the localStorage
      let item =
      {
          idItem : item_product.idItem,
          quantity: parseInt(total.value),
          color: item_product.color
      }
  
      let key = item_product.idItem + '_' + item_product.color;
  
      item_product = JSON.parse(localStorage.getItem(key));
      localStorage.setItem(key, JSON.stringify(item));

      //change the value of the total price and total quantity
      if (item_product.quantity < total.value ){
        totalQ = document.getElementById("totalQuantity");
        myTotalQuantity = parseInt(totalQ.innerHTML)
        totalQ.innerHTML = myTotalQuantity += 1;
        console.log(totalQ.innerHTML);

        
        totalP = document.getElementById("totalPrice");
        myTotalPrice = parseInt(totalP.innerHTML)
        totalP.innerHTML = myTotalPrice += product.price;
      }else{
        totalQ = document.getElementById("totalQuantity");
        myTotalQuantity = parseInt(totalQ.innerHTML)
        totalQ.innerHTML = myTotalQuantity -=1;
        
        totalP = document.getElementById("totalPrice");      
        myTotalPrice = parseInt(totalP.innerHTML)
        totalP.innerHTML = myTotalPrice -= product.price;
      }
      
      
    });


    //DELETE ITEMS
    deleteItem.addEventListener("click", function(event){

      //delete the item in the local storage
      localStorage.removeItem(key);
      

      //delete the corresponding HTML
      var buttonClicked = event.target
      buttonClicked.parentElement.parentElement.parentElement.parentElement.remove()

      //reload the cart to uptate TotalQuantity and TotalPrice
      totalQ = document.getElementById("totalQuantity");
      totalP = document.getElementById("totalPrice");  
      deleteQuantity = totalQ.innerHTML - input.value ;
      priceToDelete = input.value * product.price;
      deletePrice =  totalP.innerHTML - priceToDelete;
      document.getElementById("totalQuantity").innerHTML = deleteQuantity;
      document.getElementById("totalPrice").innerHTML = deletePrice;
        
      console.log(total_quantity);
      console.log(totalQ.innerHTML);
      console.log(input.value);
      
    });

      
  });
  
});


//supprimer
//1. supprimer la ligne du localstorage
//2. supprimer l'HTML de ton panier
//3. Relancer toute la construction de ton panier

//modification d'un quantité
//1. modification de la quantité dans localstorage
//2. supprimer l'HTML de ton panier
//3. Relancer toute la construction de ton panier


