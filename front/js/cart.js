//get the local storage back
Object.keys(localStorage).forEach(function(key){
  let info = (localStorage.getItem(key));
  
  let infoProduct = JSON.parse(info);
  


//no duplicate in the cart



//link the products api 

  const id =infoProduct [0];
  
  
  fetch("http://localhost:3000/api/products/" +id )
  .then(res => res.json())
  .then(products => {

   

    
   //Create an article
   const item = document.getElementById("cart__items");
   const article = document.createElement("article");
   item.appendChild(article);
   article.classList = "cart__item";
   article.dataset.id = infoProduct[0];
   article.dataset.color = infoProduct[3];
       
   //create a div "cart__item__img" in the article
       const itemImg = document.createElement("div");
       itemImg.className = "cart__item__img";
       article.appendChild(itemImg);
          
      //image in that div
           const img = document.createElement("img");
           img.src = products.imageUrl;
           img.alt = "Photographie d'un canapé";
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
               h2.innerHTML=infoProduct[1];
               desc.appendChild(h2)            
             
               //p (color chosen)
               const couleur = document.createElement("p");
               couleur.innerHTML =infoProduct[3];
               desc.appendChild(couleur);
            
               //p (42euro)
               const price = document.createElement("p");
               price.innerHTML = infoProduct[2] + "€";
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
                   qte.innerHTML = "Qté :";
                   quantity.appendChild(qte);
                   
                   //input
                   const input = document.createElement("input");
                   input.classList = "itemQuantity";
                   input.name = "itemQuantity";
                   input.type = "number";
                   input.min = "1";
                   input.max = "100";
                   input.value =infoProduct[4];
                   quantity.appendChild(input);


                   //add Quantity          
    const totalQuantity = document.getElementById("totalQuantity");
    totalQuantity.innerHTML = [input.value].reduce(function(acc, val) { return acc + val;}, 0);
    
               
                   //div "cart__item__content__settings__delete"
               const del = document.createElement("div");
               del.className = "cart__item__content__settings__delete";
               setting.appendChild(del);
                   
               // p (delete)
                   const deleteItem = document.createElement("p");
                   deleteItem.className = "deleteItem";
                   deleteItem.innerHTML = "Supprimer";
                   del.appendChild(deleteItem);

                   

                  //delete button 
                  //  for (var i = 0; i < deleteItem.length; i++) {
                  //   var p = deleteItem[i]
                    
                  // }
                
    deleteItem.addEventListener("click", function(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
    })
   
    function updateCartTotal(){
    console.log(input.value);
        
   
    
      
    }
                    
    //add total price
    const totalPrice = document.getElementById("totalPrice");
    totalPrice.innerHTML = [products.price].reduce(function(acc, val) { return acc + val;}, 0)
    
    
    var arr = products.price;
    var total= 0;
    for (var i in arr){
      total += arr[i];
     
    }
             

  });
    
    
   
   
});



// const deleteItem = document.getElementsByClassName("deleteItem");
//    console.log(deleteItem);
  
  




    
//add event listener

  
  

  
    // //insert image
    // const itemImg = document.querySelector(".item__img");
    // console.log(itemImg);
    // const img = document.createElement("img");
    // itemImg.appendChild(img);
    // img.src = "../images/logo.png";
    // img.alt = "Photographie d'un canapé";

    // //nom du produit
    // const title = document.getElementById("title");
    // title.innerText= product.name;
    // //price
    // const price = document.getElementById("price");
    // price.innerText= product.price;
    // //description
    // const desc = document.getElementById("description");
    // desc.innerText = product.description;
    // //color select
    // const array1 = product.colors;
    // array1.forEach(element => {
    //     const option = document.getElementById("colors");
    //     const col = document.createElement("option");
    //     option.appendChild(col)
    //     col.innerHTML = element;
    //     col.value = element;
    
    // });

   
    
    
   



    


    