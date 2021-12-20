//use of Fetch to get the products from the API
  fetch("http://localhost:3000/api/products")

  .then(res => res.json())
  .then(products => {
  

    //for each products from the API, we want to display their pictures, names and description
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
      img.alt = product.altTxt;
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