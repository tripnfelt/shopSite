//ensure page is loaded, run buttons in ready state

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  // Button function to Remove items from cart

  var removeItemButton = document.getElementsByClassName("btn-danger");

  for (var i = 0; i < removeItemButton.length; i++) {
    var button = removeItemButton[i];
    button.addEventListener("click", removeCartItem);
  }

  //update the total in cart live and stop negative numbers
  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var inputs = quantityInputs[i];
    inputs.addEventListener("change", quantityChanged);
  }

  //add to cart buttons
  var addToCartbuttons = document.getElementsByClassName("shop-item-button");
  for (var i = 0; i < addToCartbuttons.length; i++) {
    var button = addToCartbuttons[i];
    button.addEventListener("click", addToCartClicked);
  }
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  var imgSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  // console.log(title, price, imgSrc)

  addItemToCart(title, price, imgSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imgSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  //check if already exists in cart
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("Item already in Cart");
      return;
    }
  }
  var cartRowContents = `
    <div class="cart-item cart-column">
    <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
    <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.appendChild(cartRow);
  //add event listener for buttons created after page first loads, removing and updating quantity
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

// update price in cart

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    // console.log(priceElement, quantityElement, 'test')
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    // console.log(price * quantity)
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100; //round to the nearest 2 decimal places
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}

// open cart sidebar
function openCart() {
  document.getElementById("mySidebar").style.width = "400px";
  document.getElementById("main").style.marginLeft = "400px";
}

//close cart sidebar
function closeCart() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
