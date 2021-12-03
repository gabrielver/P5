const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const productColor = document.querySelector("select");
const productNr = document.querySelector("#quantity");  //document.getElementById("quantity")
const cart = document.querySelector("#addToCart");


fetch("http://localhost:3000/api/products/" +id)
.then(res => res.json())
.then(product => {
    
    //add event listener
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

    //nom du produit
    const title = document.getElementById("title");
    title.innerText= product.name;
    //price
    const price = document.getElementById("price");
    price.innerText= product.price;
    //description
    const desc = document.getElementById("description");
    desc.innerText = product.description;
    //color select
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

       if(productNr.value <= 0) {
           alert("Veuillez sélectionner une quantité svp");
           return;
       }

       if(productColor.value === "") {
           alert("Veuillez sélectionner une couleur svp");
           return;
       }

        let item =
            {
                idItem : id,
                quantity: parseInt(productNr.value),
                color: productColor.value
            }
        console.log(item);
        //Check if you already have a thing in there ?
        let key = id + '_' + productColor.value; //77711f0e466b4ddf953f677d30b0efc9_blue
       if (localStorage.getItem(key) == null) {
           localStorage.setItem(key, JSON.stringify(item));
       }
       else {
           item = JSON.parse(localStorage.getItem(key));
           item.quantity = item.quantity + parseInt(productNr.value); //item.quantity += productNr.value;
           localStorage.setItem(key, JSON.stringify(item));
       }
    }

    
});

    