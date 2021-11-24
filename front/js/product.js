const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

fetch("http://localhost:3000/api/products/" +id)
.then(res => res.json())
.then(product => {
    console.log(product);
});

      