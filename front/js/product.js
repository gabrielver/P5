const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const productColor = document.querySelector("select");
const productNr = document.querySelector("#quantity");
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
    img.src = "../images/logo.png";
    img.alt = "Photographie d'un canapé";

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
 
    
 

    function saveLocalInfoProduct(panier){
            
        const productName = product.name;
        const productPrice = product.price;
        var colorV = productColor.value;
        var nrValue =  productNr.value;

        //Check if you already have a thing in there ?
        

        let infoProduct = [id , productName, productPrice, colorV, nrValue];

        let productlinea = JSON.stringify(infoProduct);
        var myCart = "myCart";
        var myCartId = localStorage.length+1;
        localStorage[myCart + myCartId] = productlinea;

   }
    

//    function saveLocalInfoProduct(items){
    
//     let item = [
//         {
//             idItem : id,
//             quantity: productNr.value,
//             color: productColor.value
//         },
//     ]
//     console.log(item)
//     //Check if you already have a thing in there ?

//     if (localStorage.getItem('item') == null){
//         item = [];
//     }else{
//          item = JSON.parse(localStorage.getItem('item'));
//      }

//     item.push(items);
//     localStorage.setItem("item", JSON.stringify(item));
    
// }

    
});

    