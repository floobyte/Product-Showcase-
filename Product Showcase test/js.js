document.addEventListener("DOMContentLoaded", () => {
    
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(data => displayProducts(data))
        .catch(error => console.error("Error fetching products:", error));
});



  cartCount = 0;
  let calculateTotal = [];
  flag = 0
  flag2 = 0  


function displayProducts(products) {
    const productContainer = document.getElementById("products");

    products.forEach(product => {
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);
    });
}

function createProductCard(product) {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.title;

    const title = document.createElement("h3");
    title.textContent = product.title.slice(0,60);

    const price = document.createElement("p");
    price.textContent = `Rs${product.price}`;

    

// ye detail ke liye image pe addEventListener laga rahe hai
    image.addEventListener("click", () =>{
        localStorage.setItem("product", JSON.stringify(product));
        window.location.assign("./detail/details.html")
        
    })

   


// ye add to cart button banaya 
    const btn = document.createElement("button")
    btn.setAttribute("class","button")
    btn.textContent = "Add to Cart"



// add cart item count ko select kiya
   let count = document.querySelector(".count");

// total_price ko select kiya
   let total_price = document.querySelector("#total_price");

// add to cart function banaya 
   function addToCart(img, price) {
    cartCount = cartCount + 1;
    count.textContent = `${cartCount}`;
    alert("Product Added To Cart");

    // cart item store karane ke liye
    const cartdiv = document.createElement("div");
    cartdiv.setAttribute("class", "cartdiv");
    const Buy = document.createElement("button");
    Buy.setAttribute("class", "buy");
    Buy.innerHTML = "Check Out";
    const cartImage = document.createElement("img");
    cartImage.src = img;
    cartImage.setAttribute("class", "cartimg");
    const trashbtn = document.createElement("i");
    trashbtn.setAttribute("class", "fa-solid fa-trash");
    const cartPrice = document.createElement("p");
    const cartPricee = document.createTextNode(price);
    cartPrice.appendChild(cartPricee);

    // Event listener to remove item from cart
    trashbtn.addEventListener("click", () => {
        cartCount = cartCount - 1;
        alert("Product removed from cart");
        count.textContent = `${cartCount}`;
        cartdiv.remove();

        // Recalculate total price
        calculateTotal = calculateTotal.filter(itemPrice => itemPrice !== price);
        const myTotal = calculateTotal.reduce((accum, curVal) => accum + curVal, 0);
        console.log(myTotal);
        total_price.innerHTML = `Total_Price:- $${myTotal}`;
    });

    // Event listener to navigate to payment page
    Buy.addEventListener("click", () => {
        window.location.assign("/Payment/index.html");
    });

    // Append elements to cart
    rendar.appendChild(cartdiv);
    cartdiv.appendChild(cartImage);
    cartdiv.appendChild(cartPrice);
    cartdiv.appendChild(trashbtn);
    cartdiv.appendChild(Buy);

    // Update total price
    calculateTotal.push(price);
    const myTotal = calculateTotal.reduce((accum, curVal) => accum + curVal, 0);
    console.log(myTotal);
    total_price.innerHTML = `Total_Price:- $${myTotal}`;
}



    
// yaha add to cart wale btn pe addEventListener lagaya
    btn.addEventListener("click", () =>  addToCart(product.image , product.price))

  
   
// yaha cart item append karya 
    productCard.appendChild(image);
    productCard.appendChild(title);
    productCard.appendChild(price);
    // productCard.appendChild(description);
    productCard.appendChild(btn);

    return productCard;
}





// login page ko show karne wala finction
function showmodel(){
    if(flag2==0){
    document.querySelector(".loginform").classList.add("showform")
    document.querySelector(".rendar").classList.remove("showrendeer")
    flag2 = 1
    }else{
        document.querySelector(".loginform").classList.remove("showform")
        flag2 = 0
    }
}
// login page ko hide karne wala unction
function remove(){
    document.querySelector(".loginform").classList.remove("showform")
    flag2 = 0
  
}


// cart ko show karnw wala finction 
function showrender(){
    if(flag==0){
    document.querySelector(".rendar").classList.add("showrendeer")
    document.querySelector(".loginform").classList.remove("showform")
    flag = 1
    }else{
        document.querySelector(".rendar").classList.remove("showrendeer")
        flag = 0
    }
}

// cart ko hide karne wala function 
function cartremove(){
    document.querySelector(".rendar").classList.remove("showrendeer")
    flag = 0
}

