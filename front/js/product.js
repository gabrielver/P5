//we target the search bar that contain the url
const queryString = window.location.search;
console.log(queryString);
//we get back the Id from the url
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

const productColor = document.querySelector("select");
const productNr = document.querySelector("#quantity");
const cart = document.querySelector("#addToCart");

//use of Fetch + the id to get the product info we need from the API
fetch("http://localhost:3000/api/products/" +id)
.then(res => res.json())
.then(product => {
    
    //add event listener to save the product in the localStorage and add it in our cart
    cart.addEventListener("click", saveLocalInfoProduct);


    //name of the product (top of the page)
    const name = document.querySelector("title")
    name.innerText = product.name
    console.log(name);
    //insert image
    const itemImg = document.querySelector(".item__img");
    console.log(itemImg);

    const img = document.createElement("img");
    itemImg.appendChild(img);
    img.src = product.imageUrl;
    img.alt = product.altTxt;

    //name of the product
    const title = document.getElementById("title");
    title.innerText= product.name;
    //price
    const price = document.getElementById("price");
    price.innerText= product.price;
    //description
    const desc = document.getElementById("description");
    desc.innerText = product.description;
    //color selection
    const array1 = product.colors;
    array1.forEach(element => {
        const option = document.getElementById("colors");
        const col = document.createElement("option");
        option.appendChild(col)
        col.innerHTML = element;
        col.value = element;
        
    
    });
 
//Save into Local storage
   function saveLocalInfoProduct() {
       //error message if the color of the product is not define
       if(productColor.value === "") {
        alert("Veuillez sélectionner une couleur svp");
        return;
    }
        //error message if the quantity of the product is not define
       if(productNr.value <= 0) {
           alert("Veuillez sélectionner une quantité svp");
           return;
       }
       //message to confirm that the product is added to the cart
       alert("Votre produit a bien été ajouté au panier");
       //we create the object that we are going to save in the local storage
        let item =
            {
                idItem : id,
                quantity: parseInt(productNr.value),
                color: productColor.value
            }
       //key will be the name of our product in the local storage
        let key = id + '_' + productColor.value; //77711f0e466b4ddf953f677d30b0efc9_blue
         //Check if we already have this item in the local storage
       if (localStorage.getItem(key) == null) {
           //if no, we save our item in the local storage
           localStorage.setItem(key, JSON.stringify(item));
       }
       else {
           //if our item is already something in the local storage
           item = JSON.parse(localStorage.getItem(key));
           //we update the quantity and save it with his new value 
           item.quantity = item.quantity + parseInt(productNr.value);
           localStorage.setItem(key, JSON.stringify(item));
       }
    }
    
    
});

    