
  fetch("http://localhost:3000/api/products")

  .then(res => res.json())
  .then(products => {
  
//     let arr_products = JSON.parse(products);

    products.forEach(function (product) {

      //create an a
      const a = document.createElement("a");
      items.appendChild(a);
      a.href ="product.html?id=" + product._id;
      //CREATE AN ARTICLE
      const article = document.createElement("article");
      a.appendChild(article)
      // create an img in the article
      const img = document.createElement('img');
      article.appendChild(img);
      // Set the image source to an image url from the API data.
      img.src = product.imageUrl;
      img.alt = product.altText;
      // Create an h3 in the article
      const h3 = document.createElement("h3");
      article.appendChild(h3);
      h3.classList = "productName";
      h3.innerText = product.name;
      //create a p
      const p = document.createElement("p");
      article.appendChild(p);
      p.classList ="productDescription";
      p.innerText = product.description;
    });
    
  })
      // .catch(function(err) {
      //   // Une erreur est survenue
      // });
    


// const main = document.querySelector('main');
//const items = document.querySelector('.items');
// fetch("C:\Users\gabriel\Desktop\P5-Dev-Web-Kanap-master\back\models\Product.js")
// .then(res => res.json())
// .then(data => {
// console.log(data[0].name);


// //create an a
// const a = document.createElement("a");
// items.appendChild(a);
// a.href="./product.html?id=42";
// //CREATE AN ARTICLE
// const article = document.createElement("article");
// a.appendChild(article)
// // create an img in the article
// const img = document.createElement('img');
// article.appendChild(img);
// // Set the image source to an image url from the API data.
// img.src = "/back/images/kanap01.jpeg";
// img.style.background = "white";
// img.alt = "Lorem ipsum dolor sit amet, Kanap name1"
// // Create an h3 in the article
// const h3 = document.createElement("h3");
// article.appendChild(h3);
// h3.classList = "productName";
// h3.innerText="kanap 1";
// //create a p
// const p = document.createElement("p");
// article.appendChild(p);
// p.classList ="productDescription";
// p.innerText = "Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.";




// var oReq = new XMLHttpRequest();
// oReq.responseType = 'json';
// oReq.onload = reqListener;
// oReq.open("get", "http://127.0.0.1:5502/back/models/Product.js", true);
// oReq.send();
// function reqListener () {
  
//       
 
// console.log(produit);



// xhr_object = new XMLHttpRequest(); 
	 
// 	xhr_object.open("GET", "http://127.0.0.1:5502/back/models/Product.js", true); 
	 
// 	xhr_object.onreadystatechange = function() { 
// 	   if(xhr_object.readyState == 4) alert(xhr_object.responseText); 
//      const product = (xhr_object.response);
//      let produit = JSON.stringify(product);
//      console.log(produit);
// 	} 
	 
// xhr_object.send(null); 





// fetch('http://127.0.0.1:5502/back/models/Product.js')
// .then(res => res.json())
// .then(data => {

//   h3.innerHTML = data[products].name;

// });


// function readTextFile(file, callback) {
//   var rawFile = new XMLHttpRequest();
//   rawFile.overrideMimeType("application/json");
//   rawFile.open("GET", "http://127.0.0.1:5502/back/models/Product.js", true);
//   rawFile.onreadystatechange = function() {
//       if (rawFile.readyState === 4 && rawFile.status == "200") {
//           callback(rawFile.responseText);
//       }
      
//   }
//   rawFile.send(null);
//   console.log(responseText);
// }

//usage:
// readTextFile("http://127.0.0.1:5502/back/models/Product.js", function(text){
//   var data = JSON.parse(text);
//   console.log(data);
// });




      // //create an a
      // const a = document.createElement("a");
      // items.appendChild(a);
      // a.href = "";
      // //CREATE AN ARTICLE
      // const article = document.createElement("article");
      // a.appendChild(article)
      // // create an img in the article
      // const img = document.createElement('img');
      // article.appendChild(img);
      // // Set the image source to an image url from the API data.
      // img.src = "/back/images/kanap01.jpeg";
      // img.style.background = "white";
      // img.alt = "Lorem ipsum dolor sit amet, Kanap name1"
      // // Create an h3 in the article
      // const h3 = document.createElement("h3");
      // article.appendChild(h3);
      // h3.classList = "productName";
      // h3.innerText = "kanap";
      // //create a p
      // const p = document.createElement("p");
      // article.appendChild(p);
      // p.classList ="productDescription";
      // p.innerText = "Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.";
     
