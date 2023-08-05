
if (document.readyState == 'loading') {

  document.addEventListener("DOMContentLoaded", ready)
}
else {
  ready()
}
function ready() {
  loadCartItemsFromLocalStorage()
  const desRem=document.getElementsByClassName('close-des')[0]
    desRem.addEventListener('click',()=>{
      document.getElementsByClassName('carts-pages')[0].style.display="none"
      document.getElementsByClassName('product')[0].style.display="flex"
      document.getElementsByClassName('products')[0].style.display="block"
      document.getElementsByClassName('content')[0].style.display="block"
      document.getElementsByClassName('header')[0].style.display="block"
      
    })

  //des close for the cart

 
  const addCartBtn=document.getElementsByClassName('add-cart')
  
  for (var i=0;i<addCartBtn.length;i++){
    var clickedBTn=addCartBtn[i]
    
    clickedBTn.addEventListener('click',(event)=>{

      const targetBtn=event.target;
      const targetBtnParent=targetBtn.parentElement;
        var item_img=targetBtnParent.getElementsByClassName('product-image')[0].src
        var item_title=targetBtnParent.getElementsByClassName('banner-item-title')[0].innerText
        var item_price=targetBtnParent.getElementsByClassName('one')[0].innerText
    
        
      addItemToCart(item_img,  item_title, item_price)
      
    })
    
  }
  
function addItemToCart(item_img,  item_title, item_price){
  const cartItemsi = document.getElementsByClassName("cart-items")[0];
  const cartRowsi = cartItemsi.getElementsByClassName("item1");
  for (let i = 0; i < cartRowsi.length; i++) {
    const cartRowi = cartRowsi[i];
    const imageElement = cartRowi.querySelector(".cart-img");
    if (imageElement.src === item_img) {
      // Item with the same image is already in the cart
      alert("Item is already in the cart.");
      return; // Exit the function and don't add the item again
    }
  }
    var cartRow = document.createElement("div")
    cartRow.classList.add("item1") 
    var cartItems = document.getElementsByClassName("cart-items")
    var cartRowContents = ` 
    <div class="cart-image">
                    <img class="cart-img" src="${item_img}">
                </div>
                <div class="cart-des">
                    <div class="item-title">
                        <p class="cart-item-title">${item_title}</p>
                    </div>
                    <div class="item-quantity">
                        <button class="minus">-</button>
                        <input type="number" class="quantity" value=1 style="width:60px;">
                        <button class="plus">+</button>
                    </div>
                    <div class="total-price">
                        <p class="price">${item_price}</p>
                    </div>
                </div>
                <div class="cart-buttons">
                    <button class="close">Remove</button>
                </div>
                
  `
    cartRow.innerHTML=cartRowContents
    cartItems[0].append(cartRow)
    UpdateCartTotal()
    

  
  
  const remButton=document.getElementsByClassName('close')
  for(var i=0;i<remButton.length;i++){
    var btnDanger=remButton[i]
    btnDanger.addEventListener('click',removeItems)

  }

  
  // quantity custom button



  function initializeQuantityInput(cartRow) {
    const quantityInput = cartRow.getElementsByClassName('quantity')[0];
    const minusButton = cartRow.getElementsByClassName('minus')[0];
    const plusButton = cartRow.getElementsByClassName('plus')[0];
    const priceElement = cartRow.getElementsByClassName("price")[0];
  
    // Set the default value to be greater than 0
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity <= 0 || isNaN(currentQuantity)) {
      currentQuantity = 1;
      quantityInput.value = currentQuantity;
    }
  
    // Function to handle minus button click
    minusButton.addEventListener('click', () => {
      if (currentQuantity > 1) {
        currentQuantity--;
        quantityInput.value = currentQuantity;
        updateCartItemTotal();
      }
    });
  
    // Function to handle plus button click
    plusButton.addEventListener('click', () => {
      currentQuantity++;
      quantityInput.value = currentQuantity;
      updateCartItemTotal();
    });
  
    // Function to handle manual input changes (to ensure value is greater than 0)
    quantityInput.addEventListener('change', () => {
      let inputQuantity = parseInt(quantityInput.value);
      if (inputQuantity <= 0 || isNaN(inputQuantity)) {
        inputQuantity = 1;
        quantityInput.value = inputQuantity;
      }
      currentQuantity = inputQuantity;
      updateCartItemTotal();
    });
  
    // Function to update the total price based on quantity
    function updateCartItemTotal() {
      let itemPrice = parseFloat(priceElement.innerText.replace("ksh.", ""));
      if (!isNaN(itemPrice)) {
        let total = itemPrice * currentQuantity;
        priceElement.innerText = "ksh. " + total.toFixed(2);
        UpdateCartTotal();
      }
    }
  
    // Call the updateCartItemTotal function initially to set the correct price
    updateCartItemTotal();
  }
  
  
  // Call the function for each cart item
  const cartRows = document.getElementsByClassName('item1');
  for (let i = 0; i < cartRows.length; i++) {
    initializeQuantityInput(cartRows[i]);
  }
  
  // document.getElementsByClassName('close')[0].addEventListener('click',()=>{
  //   document.getElementsByClassName('content')[0].style.display="block"
  //   document.getElementsByClassName('carts-pages')[0].style.display="none"
  // })
  
  cartCount()
  UpdateCartTotal()
  updateLocalStorage(); 
  
}

function removeItems(event){
  const targetBtn=event.target
  const buttonDParent=targetBtn.parentElement.parentElement;
  buttonDParent.remove()
  cartCount()
  updateLocalStorage()
  UpdateCartTotal()
}

function updateLocalStorage() {
  let cartItems = [];
  let cartItemCont = document.getElementsByClassName('cart-items')[0];
  let cartRows = cartItemCont.getElementsByClassName('item1');

  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let item_img = cartRow.querySelector('.cart-img').src;
    let item_title = cartRow.querySelector('.cart-item-title').innerText;
    let item_price = cartRow.querySelector('.price').innerText;
    let quantity = cartRow.querySelector('.quantity').value;

    cartItems.push({
      item_img: item_img,
      item_title: item_title,
      item_price: item_price,
      quantity: quantity,
    });
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
}
function loadCartItemsFromLocalStorage() {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  let cartItemCont = document.getElementsByClassName('cart-items')[0];

  cartItems.forEach(function (item) {
    let cartRow = document.createElement('div');
    cartRow.classList.add('item1');
    let cartRowContents = `
      <div class="cart-image">
        <img class="cart-img" src="${item.item_img}">
      </div>
      <div class="cart-des">
        <div class="item-title">
          <p class="cart-item-title">${item.item_title}</p>
        </div>
        <div class="item-quantity">
          <button class="quantity-btn minus">-</button>
          <input type="number" class="quantity" value="${item.quantity}" style="width: 60px;">
          <button class="quantity-btn plus">+</button>
        </div>
        <div class="total-price">
          <p class="price">${item.item_price}</p>
        </div>
      </div>
      <div class="cart-buttons">
        <button class="close">Remove</button>
      </div>
    `;

    cartRow.innerHTML = cartRowContents;
    cartItemCont.append(cartRow);
   

    const remButton=document.getElementsByClassName('close')
    for(var i=0;i<remButton.length;i++){
    var btnDanger=remButton[i]
    btnDanger.addEventListener('click',(event)=>{
      const targetBtn=event.target
      const buttonDParent=targetBtn.parentElement.parentElement;
      buttonDParent.remove()
      UpdateCartTotal()
      cartCount()
      updateLocalStorage()
      UpdateCartTotal()
    })
    
  }

  });

  UpdateCartTotal();
  cartCount()
}

// Load cart items from localStorage when the page loads


function cartCount(){
  let a =document.getElementsByClassName("item1").length
  document.getElementsByClassName("cart-count")[0].innerText=a
}

function UpdateCartTotal() {
  var cartItemCont = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemCont.getElementsByClassName("item1");
  var total = 0;

  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("total-price")[0];
    var price = parseFloat(priceElement.innerText.replace("ksh.", ""));
    total = total + price
  }
  
  // total = Math.round(total * 100) / 100;
  let sumprice = document.getElementsByClassName("totals-price")[0];
  sumprice.innerText = "ksh." + total;
  
}

  document.getElementsByClassName('search-btn')[0].addEventListener('click',()=>{
    const userInput=document.getElementsByClassName('search-input-box')[0].value
  })
  document.getElementsByClassName('homeBtn')[0].addEventListener('click',()=>{
    document.getElementsByClassName('prodAll')[0].style.display="block"
    document.getElementsByClassName('shoe-products')[0].style.display="none"
    document.getElementsByClassName('bag-products')[0].style.display="none"

  })
  document.getElementById('bags').addEventListener("click",()=>{
    document.getElementsByClassName('products')[0].style.display="none"
    document.getElementsByClassName('product')[0].style.display="none"
    document.getElementsByClassName('shoe-products')[0].style.display="none"
    document.getElementsByClassName('bag-products')[0].style.display="block"
  })
  document.getElementById('shoes').addEventListener("click",()=>{
    document.getElementsByClassName('products')[0].style.display="none"
    document.getElementsByClassName('product')[0].style.display="none"
    document.getElementsByClassName('bag-products')[0].style.display="none"
    document.getElementsByClassName('shoe-products')[0].style.display="block"
  })
  const optionsArray=[]
  const options=document.getElementsByClassName('options')
  
  for (var i=0;i<options.length;i++){
    const option=options[i]
    optionsArray.push(option.innerText)

  }
  
  
  
  
  document.getElementsByClassName('cart-btn')[0].addEventListener('click',()=>{
    document.getElementsByClassName('carts-pages')[0].style.display="block"
    document.getElementsByClassName('product')[0].style.display="none"
    document.getElementsByClassName('products')[0].style.display="none"
    document.getElementsByClassName('content')[0].style.display="block"
    document.getElementsByClassName('header')[0].style.display="none"
    document.getElementsByClassName('footer')[0].style.display="none"
  })
  
  
  
  
  let bannerImage=document.querySelector(".banner")
  // let bannerimg=bannerImage.getElementsByTagName('img')
  document.getElementsByClassName('nav-back')[0].addEventListener('click',()=>{
   document.getElementsByClassName('banner-image').src="images\Galaxy_Cat-wallpaper-11074587.jpg"
  })
  document.getElementsByClassName('shopNow-button')[0].addEventListener('click',()=>{
    document.getElementsByClassName('content')[0].style.display="none"
    document.getElementsByClassName('view-products')[0].style.display="block"
   
  })
  
  
  
  // cart code
  var bannerParent=document.getElementsByClassName('view-products')[0]
  var bannerparentchild=bannerParent.getElementsByClassName('productone')[0]
  
  const banners=document.getElementsByClassName('product-image')
  for (var i=0;i<banners.length;i++){
    let bannersClicked=banners[i]
    bannersClicked.addEventListener('click',()=>{
      document.getElementsByClassName('content')[0].style.display="none"
      document.getElementsByClassName('view-products')[0].style.display="block"
      
    })
    bannersClicked.addEventListener("click",(event)=>{
      const bannerclick=event.target;
      var shopItem = bannerclick.parentElement
      var item_img=shopItem.getElementsByClassName('product-image')[0].src
      var item_title=shopItem.getElementsByClassName('banner-item-title')[0].innerText
      var item_price=shopItem.getElementsByClassName('one')[0].innerText
      addItemToView(item_img,  item_title,item_price)
    })
  }
  
  function addItemToView(item_img,  item_title,item_price){
      var cartRow = document.createElement("div")
      cartRow.classList.add("productone") 
      var cartItems = document.getElementsByClassName("view-products")[0]
      var cartRowContents = ` 
      <div class="image-clicked">
          <img class="img-clicked" src="${item_img}">
      </div>
      <div class="image-clicked-des">
          <div class="description">
              <p>Authencity.100% guaranteed</p>
              <h2 class="image-clicked-title">${item_title}</h2>
              <p>Available Colors: Red,black,grey</p>
              <a href="#"><button type="button" class="add-cart-button">add to cart</button></a>
              <p id="one" class="image-clicked-one">TOTAL <span>${item_price}</span></p>
          </div>
          <a href="/"><h1 class="des-close" style="color:white;">X</h1></a>
      </div>
    `
      cartRow.innerHTML=cartRowContents
      cartItems.append(cartRow)

      
  
  }
  
  
  //Add items to cart
  
  
  
  
  
  
  // Search input filter
  
  const searchInput = document.querySelector('.search-input-box');
  const productThumbnails = document.querySelectorAll('.product-banner');
  
  // Function to filter products based on the search input
  const filterProducts = () => {
    const searchTerm = searchInput.value.toLowerCase();
    productThumbnails.forEach((product) => {
      const title = product.querySelector('.banner-item-title').textContent.toLowerCase();
      if (title.includes(searchTerm)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  };
  
  // Attach the filterProducts function to the input event of the search input
  searchInput.addEventListener('input', filterProducts);
  
 
  
  //cart quantity button
  
  
  updateLocalStorage()

}
